var express = require('express');
var router = express.Router();

//first landing page when website is opened
router.get('/', function(req, res) {
  res.render('login');
});

module.exports = router;
