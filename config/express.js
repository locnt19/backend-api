var
	express = require('express'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	logger = require('morgan'),
	session = require('express-session'),
	sassMiddleware = require('node-sass-middleware');


module.exports = function () {
	var app = express();

	// view engine setup
	app.set('views', './app/views');
	app.set('view engine', 'pug');

	// app.use(logger('dev')); // Open if yoy want log error in terminal
	app.use(express.json());
	app.use(express.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(sassMiddleware({
		src: './public/sass',
		dest: './public/css',
		indentedSyntax: true, // true = .sass and false = .scss
		sourceMap: true,
		outputStyle: 'compressed',
		prefix: '/css',
		// debug: true
	}));

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);

	app.use(express.static('./public'));
	return app;
};