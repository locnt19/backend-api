var express = require('express');
var router = express.Router();

/* GET customers listing. */
router.get('/', function (req, res, next) {
  // res.redner('view file')
  res.render('login', {
    title: 'Please login with account of system'
  });
});

module.exports = router;