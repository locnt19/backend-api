var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'This Title is displayed from `./routes/index.js`',
    content: 'Your current page has a router called `index`. The router has a backdrop of `src/views/index.pug`',
    routeCreated: '`app.js` line 28',
    currentRoute: '/',
    backdrop: '`index.pug`'
  });
});

module.exports = router;
