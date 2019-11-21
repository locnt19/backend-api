var
	crypto = require('crypto'),
	User = require('mongoose').model('User'),
	Employee = require('mongoose').model('Employee'),
	express = require('express'),
	router = express.Router();


router.get('/', function (req, res, next) {
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
			Employee.aggregate([{
				$project: {
					idEmployee: "$_id",
					name: "$name"
				}
			}]).exec(function (err, employees) {
				res.render('accounts', {
					title: 'Manager Account',
					user: req.user ? req.user : '',
					accounts: users,
					employees: employees,
					messages: req.flash('info')
				});
			});
		}
	})
})
router.get('/:id', function (req, res) {
	console.log(req.params.id);
})



router.post('/', function (req, res, next) {
	var user = new User(req.body);
	// console.log("user", user);
	user.save(function (err) {
		if (err) {
			return next(err);
		} else {
			req.flash('info', 'Thêm thành công!')
			return res.redirect('/accounts');
		}
	});
})
router.post('/reset-password', function (req, res, next) {
	var user = req.body;
	console.log('user before crypto: ', user);
	var md5 = crypto.createHash('md5');
	user.password = md5.update(user.password).digest('hex');
	console.log('user after crypto: ', user);
	User.findByIdAndUpdate(user._id, user, function (err, result) {
		if (err) {
			return next(err);
		} else {
			req.flash('info', 'Reset mật khẩu thành công!')
			return res.redirect('/accounts');
		}
	})
})
module.exports = router;