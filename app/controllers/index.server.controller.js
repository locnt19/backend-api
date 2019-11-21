exports.render = function (req, res) {
	res.render('index', {
		title: 'MVC server',
		user: req.user ? req.user : ''
	});
	console.log(req.user);
};