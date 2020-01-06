var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var ObligationsController = require('../../controllers/obligations')

describe('ObligationsController', function() {
  describe('settleObligation', function() {
    let locals, render, res, next, settleObligation, cordaApi, obligationsController;
    beforeEach(() => {
      render = sinon.spy();
      locals = {};
      res = { locals, render };
      next = sinon.spy();
      settleObligation = sinon.stub();
      cordaApi = {settleObligation};
      obligationsController = new ObligationsController.ObligationsController(cordaApi);
    });
    it('should respond with error when api call fails', async function() {
      settleObligation.throws();
      const req = { body: { amount: 100, currency: 'EUR' }, params: { id: 'id0' } };
      await obligationsController.settle(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(locals.message).to.equal('Failed to settle obligation');
      expect(settleObligation.calledOnce).to.be.true;
      expect(settleObligation.args[0][0]).to.equal('id0');
      expect(settleObligation.args[0][1]).to.equal(100);
      expect(settleObligation.args[0][2]).to.equal('EUR');
    });
    it('should call next handler and set msg when api call is ok', async function() {
      settleObligation.returns('OK!');
      const req = { body: { amount: 100, currency: 'EUR' }, params: { id: 'id0' } };
      await obligationsController.settle(req, res, next);
      expect(render.calledOnce).to.be.false;
      expect(next.calledOnce).to.be.true;
      expect(settleObligation.calledOnce).to.be.true;
      expect(settleObligation.args[0][0]).to.equal('id0');
      expect(settleObligation.args[0][1]).to.equal(100);
      expect(settleObligation.args[0][2]).to.equal('EUR');
      expect(req.msg).to.equal('OK!');
    });
  });
});