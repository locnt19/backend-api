var
	employees = require('../controllers/employees.server.controller'),
	passport = require('passport');

module.exports = function (app) {
	app.route('/employees')
		.get(employees.list)
		.post(employees.create)
	app.route('/employee/:id')
		.get(employees.read)
		.put(employees.update)
		.delete(employees.delete);
	app.param('id', employees.userByID);
};