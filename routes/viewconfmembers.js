var express = require('express');
var router = express.Router();

var database = require('../database');

//viewing conference members
router.post('/viewconfmembers',function(req,res){
  query=`
  SELECT * FROM conference WHERE CONF_ID="${req.session.confid}"
  `;
  database.query(query,function(error,data){
    if(error){
      res.send(error);
    }
    else{
      req.session.conf=data[0];
      res.redirect('viewm');
    }
  });
});

router.get('/viewm',function(req,res){
  res.render('addConfMembers',{session:req.session});
});

module.exports = router;