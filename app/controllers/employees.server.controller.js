var
	Employee = require('mongoose').model('Employee'),
	passport = require('passport');

exports.create = function (req, res, next) {
	var employee = new Employee(req.body);
	employee.save(function (err) {
		if (err) {
			req.flash('info', 'Thêm thất bại!');
			return next(err);
		} else {
			req.flash('info', 'Thêm thành công!');
			return res.redirect('/employees');
		}
	});

};

exports.list = function (req, res, next) {
	Employee.find({}, function (err, users) {
		if (err) {
			return next(err);
		} else {
			res.render('employees', {
				title: 'Manager Employee',
				user: req.user ? req.user : '',
				employees: users,
				messages: req.flash('info')
			});
		}
	});
};

exports.read = function (req, res) {
	res.render('employee-detail', {
		title: 'Profile: ' + req.userProfile.name,
		user: req.user ? req.user : '',
		userProfile: req.userProfile,
		messages: req.flash('info')
	});
	// console.log("userProfile: ", req.userProfile);
	// console.log("userLogin: ", req.user);

};

exports.userByID = function (req, res, next, id) {
	Employee.findOne({
			_id: id
		},
		function (err, user) {
			if (err) {
				res.render('404', {
					title: 'Page not found'
				});
			} else {
				req.userProfile = user;
				next();
			}
		}
	);
};

exports.update = function (req, res, next) {
	Employee.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
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