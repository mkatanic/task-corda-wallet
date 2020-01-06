var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var ObligationsController = require('../../controllers/obligations')

describe('ObligationsController', function() {
  describe('getSettlePage', function() {
    let locals, render, res, me, obligations, cordaApi, obligationsController;
    beforeEach(() => {
      render = sinon.spy();
      locals = {};
      res = { locals, render };
      me = sinon.stub().returns({ me: 'PartyA' });
      obligations = sinon.stub();
      var obligationsArray = [
        {
          amount: '100 EUR',
          linearId: { id: 'id0' }
        },
        {
          amount: '200 CHF',
          linearId: { id: 'id1' }
        },
        {
          amount: '300 RSD',
          linearId: { id: 'id2' }
        }
      ];
      obligations.returns(obligationsArray);
      cordaApi = { me,obligations };
      obligationsController = new ObligationsController.ObligationsController(cordaApi);
    });
    it('should render the page when obligation is found and no message is set in request', async function() {
      var req = { params: { id: 'id1' } };
      await obligationsController.getSettlePage(req, res, {});
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('pay-obligation');
      expect(me.calledOnce).to.be.true;
      expect(obligations.calledOnce).to.be.true;
      expect(render.args[0][1].obligation.currency).to.equal('CHF');
    });
    it('should render the page when obligation is found and message is set in request', async function() {
      var req = { params: { id: 'id1' }, msg: 'something paid off' };
      await obligationsController.getSettlePage(req, res, {});
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('pay-obligation');
      expect(me.calledOnce).to.be.true;
      expect(obligations.calledOnce).to.be.true;
      expect(render.args[0][1].obligation.currency).to.equal('CHF');
      expect(render.args[0][1].msg).to.equal('something paid off');
    });
    it('should render the page when obligation is not found and message is set in request', async function() {
      var req = { params: { id: 'id5' }, msg: 'something paid off completly' };
      await obligationsController.getSettlePage(req, res, {});
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('pay-obligation');
      expect(me.calledOnce).to.be.true;
      expect(obligations.calledOnce).to.be.true;
      expect(render.args[0][1].obligation).to.equal(undefined);
      expect(render.args[0][1].msg).to.equal('something paid off completly');
    });
    it('should render the error when obligation is not found and message is not set in request', async function() {
      var req = { params: { id: 'id5' } };
      await obligationsController.getSettlePage(req, res, {});
      expect(render.calledOnce).to.be.true;
      expect(render.args[0][0]).to.equal('error');
      expect(me.calledOnce).to.be.true;
      expect(obligations.calledOnce).to.be.true;
      expect(locals.message).to.equal('Wrong id');
    });
  });
});