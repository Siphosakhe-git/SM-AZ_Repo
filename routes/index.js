var express = require('express');
var router = express.Router();

//first landing page
router.get('/', function(req, res) {
  res.render('login');
});

module.exports = router;