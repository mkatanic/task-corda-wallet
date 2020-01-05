var express = require('express');
var router = express.Router();
var common = require('../common')
var corda = require('../api_access/corda-api')
var cordaApi = new corda.CordaAPI(common.cordaApiUrl)
var ObligationsController = require('../controllers/obligations')
var controller = new ObligationsController.ObligationsController(cordaApi)
var HomeController = require('../controllers/index.js')
var homeController = new HomeController.HomeController(cordaApi);

/* POST create obligation. */
router.post('/issue', controller.issue.bind(controller), homeController.home.bind(homeController))

/* GET obligation settle page. */
router.get('/pay/:id', controller.getSettlePage.bind(controller))

/* POST settle obligation. */
router.post('/settle/:id', controller.settle.bind(controller), controller.getSettlePage.bind(controller))

module.exports = router;