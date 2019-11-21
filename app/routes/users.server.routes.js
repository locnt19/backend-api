var
	users = require('../../app/controllers/users.server.controller'),
	login = require('../../app/controllers/login.server.controller');

module.exports = function (app) {
	app.use('/login', login);
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})
	app.use('/accounts', users);
};