var common = require('../common')

class CashController {
  constructor(cordaApi) {
    this.cordaApi = cordaApi;
  }

  /* POST self issue cash. */
  async issueCash(req, res, next) {
    console.log('issue cash: ' + req.body.amount + ' ' + req.body.currency);
    try {
      var amount = parseInt(req.body.amount);
      if (amount === undefined) {
        throw 'Wrong amount';
      }
      var msg = await this.cordaApi.issueCash(req.body.amount, req.body.currency);
      req.msg = msg.amount + ' to ' + msg.owner;
      next();
    }
    catch (e) {
      common.renderError(res, 'Failed to issue cash', e);
    }
  }
}

module.exports = {
  CashController
}