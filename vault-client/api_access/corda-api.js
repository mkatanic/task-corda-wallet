var rp = require('request-promise-native');

/**
 * Api to access methods of a Corda node
 */
class CordaAPI {
  constructor(url) {
    this.url = url;
    this.api = '/api/obligation';
    this.timeout = 6000;
  }

  /**
   * Get name of a node owning party
   */
  me() {
    var request = {
      uri: this.url + this.api + '/me',
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Get available peers on corda network
   */
  peers() {
    var request = {
      uri: this.url + this.api + '/peers',
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Issues cash to party making a request
   * @param {number} amount
   * @param {string} currency
   */
  issueCash(amount, currency) {
    var request = {
      uri: this.url + this.api + '/self-issue-cash' + '?amount=' + amount + '&currency=' + currency,
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Transfers cash to another party
   * @param {number} amount
   * @param {string} currency
   * @param {string} party
   */
  transferCash(amount, currency, party) {
    var request = {
      uri: this.url + this.api + '/transfer-cash' + '?amount=' + amount 
      + '&currency=' + currency + '&party=' + party,
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Get cash balances in all currencies
   */
  cashBalances() {
    var request = {
      uri: this.url + this.api + '/cash-balances',
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Issues an obligation to pay given party given amount
   * @param {number} amount
   * @param {string} currency
   * @param {string party
   */
  issueObligation(amount, currency, party) {
    var request = {
      uri: this.url + this.api + '/issue-obligation' + '?amount=' + amount 
      + '&currency=' + currency + '&party=' + party,
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Settles (part of) an obligation by paying with cash 
   * @param {string} id
   * @param {number} amount
   * @param {string} currency
   */
  settleObligation(id, amount, currency) {
    var request = {
      uri: this.url + this.api + '/settle-obligation' + '?id=' + id + '&amount=' + amount + '&currency=' + currency,
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }

  /**
   * Get all obligations in which this party is involved as a lender or a borrower
   */
  obligations() {
    var request = {
      uri: this.url + this.api + '/obligations',
      json: true,
      timeout: this.timeout
    }
    return rp(request);
  }
}

module.exports = {
  CordaAPI
}