var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('about', {
    title: 'This Title is displayed from `./routes/users.js`',
    content: 'Your current page has a router called `users`. The router has a backdrop of `src/views/about.pug`',
    routeCreated: '`app.js` line 28',
    currentRoute: '/users',
    backdrop: '`about.pug`'
  });
});

module.exports = router;