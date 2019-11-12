var
	express = require('express'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
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
	app.use(cookieParser());
	app.use(bodyParser.json({
		limit: "50mb"
	}));
	app.use(bodyParser.urlencoded({
		extended: true,
		limit: "50mb",
		parameterLimit: 50000
	}));
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
		secret: process.env.SESSION_SECRET
	}));

	app.use(flash());
	app.use(function (req, res, next) {
		res.locals.messages = require('express-messages')(req, res);
		next();
	});
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/employees.server.routes')(app);

	app.use(express.static('./public'));
	return app;
};