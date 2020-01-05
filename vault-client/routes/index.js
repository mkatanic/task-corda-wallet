var express = require('express');
var router = express.Router();
var common = require('../common')
var corda = require('../api_access/corda-api')
var cordaApi = new corda.CordaAPI(common.cordaApiUrl)
var HomeController = require('../controllers/index.js')
var controller = new HomeController.HomeController(cordaApi);

/* GET home page. */
router.get('/', controller.home.bind(controller));

module.exports = router;
