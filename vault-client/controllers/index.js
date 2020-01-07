var common = require('../common')

class HomeController {
  constructor(cordaApi) {
    this.cordaApi = cordaApi;
  }

  /* Renders the home page. */
  async home(req, res, next) {
    try {
      // Get user identity
      var identity = await this.cordaApi.me();
      // and cash
      var cash = await this.cordaApi.cashBalances();
      // and obligations
      var obligations = await this.cordaApi.obligations();
      // and peers
      var parties = await this.cordaApi.peers();
      var i = parties.peers.indexOf('Notary');
      if (i > -1)
        parties.peers.splice(i, 1);

      var pageData = {
        cash: Object.values(cash).map(c => common.crateCurrencyObject(c)),
        obligations: obligations,
        parties: parties.peers,
        currencies: common.currencies
      }

      res.render('index', { title: 'Vault', data: pageData, title: 'Vault app - home', me: identity.me, msg: req.msg });
    }
    catch (e) {
      common.renderError(res, "Something went wrong", e);
    }
    
  }
}

module.exports = {
  HomeController
}
