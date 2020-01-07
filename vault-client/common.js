/**
 * Url of the corda node the client app is targeting
 */
const cordaApiUrl = 'http://localhost:10010';

/**
 * Renders the rerror page with given message and error information
 */
function renderError(res, msg, err) {
  res.locals.message = msg;
  res.locals.error = err;
  res.render('error', { title: 'Vault App - Error' });
}

/**
 * Currencies available in the system with names and symbols
 */
const currencies = {
  EUR: {
    title: 'Euro',
    symbol: 'EUR',
  },
  USD: {
    title: 'USA Dollar',
    symbol: 'USD',
  },
  CHF: {
    title: 'Swiss Franc',
    symbol: 'CHF',
  },
  RSD: {
    title: 'Serbian Dinar',
    symbol: 'RSD',
  }
}

/**
 * Creates currency object from currency string
 * @param {string} val 
 */
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