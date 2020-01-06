var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var CashController = require('../../controllers/cash')

describe('CashController', function() {
  describe('issueCash', function() {
    let locals, render, res, next, issueCash, cordaApi, cashController;
    beforeEach(() => {
      render = sinon.spy();
      locals = {};
      res = { locals, render };
      next = sinon.spy();
      issueCash = sinon.stub();
      cordaApi = {issueCash};
      cashController = new CashController.CashController(cordaApi);
    });
    it('should not issue cash when amount is not a number', async function() {
      var req = { body: { amount: 'foo', currency: 'bar' } };
      await cashController.issueCash(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(issueCash.calledOnce).to.be.false;
    });
    it('should not issue cash when amount is negative number', async function() {
      var req = { body: { amount: -100, currency: 'EUR' } };
      await cashController.issueCash(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(issueCash.calledOnce).to.be.false;
    });
    it('should respond with error when api call fails', async function() {
      issueCash.throws();
      var req = { body: { amount: 100, currency: 'bar' } };
      await cashController.issueCash(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(issueCash.calledOnce).to.be.true;
      expect(issueCash.args[0][0]).to.equal(100);
      expect(issueCash.args[0][1]).to.equal('bar');
    });
    it('should call next handler and set msg when api call is ok', async function() {
      issueCash.returns({amount: '100 EUR', owner: 'me'});
      var req = { body: { amount: 100, currency: 'EUR' } };
      await cashController.issueCash(req, res, next);
      expect(render.calledOnce).to.be.false;
      expect(next.calledOnce).to.be.true;
      expect(issueCash.calledOnce).to.be.true;
      expect(issueCash.args[0][0]).to.equal(100);
      expect(issueCash.args[0][1]).to.equal('EUR');
      expect(req.msg).to.equal('100 EUR to me');
    });
  });
});