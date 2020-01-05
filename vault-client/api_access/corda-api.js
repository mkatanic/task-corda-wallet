var rp = require('request-promise-native');

class CordaAPI {
  constructor(url) {
		this.url = url;
		this.api = '/api/obligation';
		this.timeout = 6000;
  }

  me() {
    var request = {
			uri: this.url + this.api + '/me',
			json: true,
			timeout: this.timeout
		}
		return rp(request);
  }

	peers() {
		var request = {
			uri: this.url + this.api + '/peers',
			json: true,
			timeout: this.timeout
		}
		return rp(request);
	}

	issueCash(amount, currency) {
		var request = {
			uri: this.url + this.api + '/self-issue-cash' + '?amount=' + amount + '&currency=' + currency,
			json: true,
			timeout: this.timeout
		}
		return rp(request);
	}

	cashBalances() {
		var request = {
			uri: this.url + this.api + '/cash-balances',
			json: true,
			timeout: this.timeout
		}
		return rp(request);
	}

	issueObligation(amount, currency, party) {
		var request = {
			uri: this.url + this.api + '/issue-obligation' + '?amount=' + amount 
			+ '&currency=' + currency + '&party=' + party,
			json: true,
			timeout: this.timeout
		}
		return rp(request);
	}

	settleObligation(id, amount, currency) {
		var request = {
			uri: this.url + this.api + '/settle-obligation' + '?id=' + id + '&amount=' + amount + '&currency=' + currency,
			json: true,
			timeout: this.timeout
		}
		return rp(request);
	}

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