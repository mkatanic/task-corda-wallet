const cordaApiUrl = 'http://localhost:10010';

function renderError(res, msg, err) {
  res.locals.message = msg;
  res.locals.error = err;
  res.render('error', { title: 'Vault App - Error' });
}

const currencies = {
  EUR: {
    title: 'Euro',
    symbol: 'EUR',
  },
  CHF: {
    title: 'Swiss Franc',
    symbol: 'CHF',
  },
  RSD: {
    title: 'Serbian Dinar',
    symbol: 'RSD',
  },
  USD: {
    title: 'USA Dollar',
    symbol: 'USD',
  }
}

function crateCurrencyObject(val) {
  var amount = val.split(' ')[0];
  var currency = val.split(' ')[1];
  var result = currencies[currency];
  if (result === undefined) {
    return {
      title: currency,
      symbol: currency,
      amount: amount
    }
  }
  result.amount = amount;
  return result;
}

module.exports = {
  cordaApiUrl,
  renderError,
  currencies,
  crateCurrencyObject
}