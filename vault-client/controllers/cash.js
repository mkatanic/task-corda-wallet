var common = require('../common')

class CashController {
  constructor(cordaApi) {
    this.cordaApi = cordaApi;
  }

  /* Issues some cash to self. */
  async issueCash(req, res, next) {
    try {
      var amount = parseInt(req.body.amount);
      if (!amount || amount < 0) {
        throw 'Wrong amount';
      }
      var msg = await this.cordaApi.issueCash(amount, req.body.currency);
      req.msg = msg.amount + ' to ' + msg.owner;
      next();
    }
    catch (e) {
      common.renderError(res, 'Failed to issue cash', e);
    }
  }

  /* Transfer cash to anouther party. */
  async transferCash(req, res, next) {
    try {
      var amount = parseInt(req.body.amount);
      if (!amount || amount < 0) {
        throw 'Wrong amount';
      }
      var msg = await this.cordaApi.transferCash(amount, req.body.currency, req.body.party);
      req.msg = msg;
      next();
    }
    catch (e) {
      common.renderError(res, 'Failed to transfer cash', e);
    }
  }
}

module.exports = {
  CashController
}