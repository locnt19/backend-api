/**
 * GET /
 * Login page.
 */
exports.getLogin = (req, res) => {
  res.render('login', {
    title: './controllers/accounts.js // getLogin()'
  });
};

/**
 * GET /
 * Accounts page.
 */
exports.getAccounts = (req, res) => {
  res.render('accounts', {
    title: './controllers/accounts.js // getAccounts()'
  });
};