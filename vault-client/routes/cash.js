var express = require('express');
var router = express.Router();
var common = require('../common')
var corda = require('../api_access/corda-api')
var cordaApi = new corda.CordaAPI(common.cordaApiUrl)
var CashController = require('../controllers/cash')
var cashController = new CashController.CashController(cordaApi)
var HomeController = require('../controllers/index.js')
var homeController = new HomeController.HomeController(cordaApi);

/* POST self issue cash. */
router.post('/issue', cashController.issueCash.bind(cashController), homeController.home.bind(homeController) );

/* POST transfer cash. */
router.post('/transfer', cashController.transferCash.bind(cashController), homeController.home.bind(homeController) );

module.exports = router;