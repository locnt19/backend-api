const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const chalk = require('chalk');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;

const Account = require('./models/account');
const upload = multer({
  dest: path.join(__dirname, 'uploads')
});


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
  path: '.env'
});


/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const accountController = require('./controllers/accounts');
const customerController = require('./controllers/customers');


/**
 * Create Express server.
 */
const app = express();


/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
// When the connection is connected
mongoose.connection.on('connected', function (err) {
  console.log(chalk.green('✓ Mongoose default connection open to', process.env.MONGODB_URI));
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log(chalk.yellow('Mongoose disconnected'));
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(chalk.red('✗ App terminated, closing mongo connections'));
    process.exit(0);
  });
});


/**
 * Express configuration.
 */
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 3600000
  }, // One hours in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Passport configuration.
 */
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


/**
 * Primary app routes.
 */
app.get('/', homeController.getDashboard);
app.get('/login', accountController.getLogin);
app.post('/login', accountController.postLogin);
app.get('/customers', customerController.getCustomers);
app.get('/accounts', accountController.getAccounts);


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ======================================== TEST SO SANH USERNAME VA PASSWORD
// const Account = require('./models/account');

// const testAccount = new Account({
//   username: 'root',
//   password: 'root',
// })
// testAccount.save(function (err) {
//   if (err) throw err;
// })

// // fetch user and test password verification
// Account.findOne({
//   username: 'root'
// }, function (err, user) {
//   if (err) throw err;
//   console.log(('username: root'));

//   // test a matching password
//   user.comparePassword('root', function (err, isMatch) {
//     if (err) throw err;
//     console.log('Password(root):', isMatch); // -> Password123: true
//   });

//   // test a failing password
//   user.comparePassword('123Password', function (err, isMatch) {
//     if (err) throw err;
//     console.log('123Password:', isMatch); // -> 123Password: false
//   });
// });

// // ======================================== TEST XAC THUC BANG PLUGIN PASSPORT.JS
// const LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

module.exports = app;