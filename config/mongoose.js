var mongoose = require('mongoose');

module.exports = function () {
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useUnifiedTopology', true);
	var db = mongoose.connect(process.env.MONGODB_URI);
	require('../app/models/user.server.model');
	require('../app/models/employee.server.model');
	return db;
};