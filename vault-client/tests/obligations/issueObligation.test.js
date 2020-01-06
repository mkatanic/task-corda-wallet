var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var ObligationsController = require('../../controllers/obligations')

describe('ObligationsController', function() {
  describe('issueObligation', function() {
    let locals, render, res, next, issueObligation, cordaApi, obligationsController;
    beforeEach(() => {
      render = sinon.spy();
      locals = {};
      res = { locals, render };
      next = sinon.spy();
      issueObligation = sinon.stub();
      cordaApi = {issueObligation};
      obligationsController = new ObligationsController.ObligationsController(cordaApi);
    });
    it('should respond with error when api call fails', async function() {
      issueObligation.throws();
      var req = { body: { amount: 24, currency: 'hour', party: 'people' } };
      await obligationsController.issue(req, res, next);
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(locals.message).to.equal('Failed to create obligation');
      expect(issueObligation.calledOnce).to.be.true;
      expect(issueObligation.args[0][0]).to.equal(24);
      expect(issueObligation.args[0][1]).to.equal('hour');
      expect(issueObligation.args[0][2]).to.equal('people');
    });
    it('should call next handler and set msg when api call is ok', async function() {
      issueObligation.returns('OK!');
      var req = { body: { amount: 24, currency: 'hour', party: 'people' } };
      await obligationsController.issue(req, res, next);
      expect(render.calledOnce).to.be.false;
      expect(next.calledOnce).to.be.true;
      expect(issueObligation.calledOnce).to.be.true;
      expect(issueObligation.args[0][0]).to.equal(24);
      expect(issueObligation.args[0][1]).to.equal('hour');
      expect(req.msg).to.equal('OK!');
    });
  });
});