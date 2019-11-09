process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var
	chalk = require('chalk'),
	dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
	path: '.env'
});

var
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

var
	db = mongoose(),
	app = express(),
	passport = passport();

app.listen(process.env.PORT);

module.exports = app;

console.log('Database running at ' + chalk.yellow(process.env.MONGODB_URI));
console.log(process.env.NODE_ENV + ' server running at ' + chalk.yellow(process.env.BASE_URL));