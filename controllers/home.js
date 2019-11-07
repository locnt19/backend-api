/**
 * GET /
 * Home page.
 */
exports.getDashboard = (req, res) => {
  res.render('index', {
    title: './controllers/home.js || getDashboard()',
    user: req.user
  });
};