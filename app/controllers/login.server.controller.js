var
	express = require('express'),
	passport = require('passport'),
	router = express.Router();

router.get('/', function (req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Log-in',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
})

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))


module.exports = router;