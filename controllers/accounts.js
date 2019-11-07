const {
  promisify
} = require('util');
const crypto = require('crypto');
const mongoose = require('mongoose');
const passport = require('passport');


const Account = require('../models/account');
const randomBytesAsync = promisify(crypto.randomBytes);


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
 * POST /login
 * Sign in using username and password.
 */
exports.postLogin = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/');
  });
};

/**
 * logOut
 */
exports.logOut = (req, res) => {
  req.logout();
  res.redirect('/');
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