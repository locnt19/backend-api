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
			// res.json(users);
			res.render('employees', {
				title: 'Manager Employee',
				user: req.user ? req.user.username : '',
				employees: users,
				messages: req.flash('info')
			});
		}
	});
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