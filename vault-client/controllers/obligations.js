var common = require('../common')

class ObligationsController {
  constructor(cordaApi){
    this.cordaApi = cordaApi;
  }

  /* Creates a new obligation. */
  async issue(req, res, next) {
    try {
      var msg = await this.cordaApi.issueObligation(req.body.amount, req.body.currency, req.body.party);
      req.msg = msg;
      next();
    }
    catch (e) {
      common.renderError(res, 'Failed to create obligation', e);
    }
  }

  /* Renders obligation settle page. */
  async getSettlePage(req, res, next) {
    var obligations = await this.cordaApi.obligations();

    var identity = await this.cordaApi.me();

    var index = -1;
    for (var i = 0; i < obligations.length; i++) {
      if (obligations[i].linearId.id == req.params.id)
        index = i;
    }
    if (index > -1) {
      obligations[index].currency = obligations[index].amount.split(' ')[1];
      res.render('pay-obligation', { title: 'Vault app - Settle', obligation: obligations[index], msg: req.msg, me: identity.me });
    }
    else {
      if (req.msg)
        res.render('pay-obligation', { title: 'Vault app - Settle', msg: req.msg, me: identity.me });
      else
        common.renderError(res, 'Wrong id', {status: 'No obligation with this id found'});
    }
  }

  /* Settles (part of) an obligation. */
  async settle(req, res, next) {
    try {
      var result = await this.cordaApi.settleObligation(req.params.id, req.body.amount, req.body.currency);
      req.msg = result;
      next();
    }
    catch (e) {
      common.renderError(res, 'Failed to settle obligation', e);
    }
  }
}

module.exports = {
  ObligationsController
}