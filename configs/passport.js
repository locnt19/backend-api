const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const Account = require('../models/account');

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

/**
 * Sign in using Username and Password.
 */
passport.use(new LocalStrategy(Account.authenticate()));