var express = require('express');
var router = express.Router();

var database = require('../database');


router.post('/home',function(req,res){
  query=`
  SELECT * FROM conference
  `;
  database.query(query,function(error,data){
    if(error){
      res.send(error);
    }
    else{
      req.session.allconf=data;
      res.redirect('hm');
    }
  });
});

router.get('/hm',function(req,res){
  res.render('home',{session:req.session,allconf:req.session.allconf});
});

module.exports = router;
