var
	User = require('mongoose').model('User'),
	Employee = require('mongoose').model('Employee')

exports.renderLogin = function (req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderRegister = function (req, res, next) {
	if (!req.user) {
		res.render('register', {
			title: 'Register Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

exports.register = function (req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function (err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
			}

			req.login(user, function (err) {
				if (err)
					return next(err);

				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/');
};


exports.create = function (req, res, next) {
	var user = new User(req.body);
	// console.log("user", user);
	user.save(function (err) {
		if (err) {
			return next(err);
		} else {
			req.flash('info', "Thêm thành công!")
			return res.redirect('/accounts');
		}
	});
};

exports.list = function (req, res, next) {
	User.aggregate([{
		$project: {
			_id: "$_id",
			username: "$username",
			permission: "$permission",
			owner: "$owner",
			status: "$status",
			createdAt: {
				$dateToParts: {
					date: "$createdAt",
					timezone: "+07:00"
				}
			},
			updatedAt: {
				$dateToParts: {
					date: "$updatedAt",
					timezone: "+07:00"
				}
			},
		}
	}]).exec(function (err, users) {
		if (err) {
			return next(err);
		} else {
			Employee.find({}, function (err, employees) {
				res.render('accounts', {
					title: 'Manager Account',
					user: req.user ? req.user.username : '',
					accounts: users,
					employees: employees,
					messages: req.flash('info')
				});
				// console.log('users:', users);
				// console.log('employees', employees);
			})
		}
	})
};

exports.read = function (req, res) {
	res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
	User.findOne({
			_id: id
		},
		function (err, user) {
			if (err) {
				return next(err);
			} else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function (req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.delete = function (req, res, next) {
	req.user.remove(function (err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	})
};