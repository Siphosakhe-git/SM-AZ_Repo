var express = require('express');
var router = express.Router();

var database = require('../database');

//accept abstract
router.post('/home',function(req,res){
  res.redirect('hm');
});

router.get('/hm',function(req,res){
  res.render('home',{session:req.session,allconf:req.session.allconf});
});

module.exports = router;