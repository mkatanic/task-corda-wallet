var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var CashController = require('../../controllers/cash')

describe('CashController', function() {
  describe('transferCash', function() {
    let locals, render, res, next, transferCash, cordaApi, cashController;
    beforeEach(() => {
      render = sinon.spy();
      locals = {};
      res = { locals, render };
      next = sinon.spy();
      transferCash = sinon.stub();
      cordaApi = {transferCash};
      cashController = new CashController.CashController(cordaApi);
    });
    it('should not transfer cash when amount is not a number', async function() {
      var req = { body: { amount: 'twenty four', currency: 'hour', party: 'people' } };
      await cashController.transferCash(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(transferCash.calledOnce).to.be.false;
    });
    it('should not transfer cash when amount is negative number', async function() {
      var req = { body: { amount: -24, currency: 'hour', party: 'people' } };
      await cashController.transferCash(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(transferCash.calledOnce).to.be.false;
    });
    it('should respond with error when api call fails', async function() {
      transferCash.throws();
      var req = { body: { amount: 24, currency: 'hour', party: 'people' } };
      await cashController.transferCash(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(transferCash.calledOnce).to.be.true;
      expect(transferCash.args[0][0]).to.equal(24);
      expect(transferCash.args[0][1]).to.equal('hour');
      expect(transferCash.args[0][2]).to.equal('people');
    });
    it('should call next handler and set msg when api call is ok', async function() {
      transferCash.returns('OK!');
      var req = { body: { amount: 24, currency: 'hour', party: 'people' } };
      await cashController.transferCash(req, res, next);
      expect(render.calledOnce).to.be.false;
      expect(next.calledOnce).to.be.true;
      expect(transferCash.calledOnce).to.be.true;
      expect(transferCash.args[0][0]).to.equal(24);
      expect(transferCash.args[0][1]).to.equal('hour');
      expect(req.msg).to.equal('OK!');
    });
  });
});