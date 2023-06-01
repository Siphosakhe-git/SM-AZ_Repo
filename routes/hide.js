var express = require('express');
var router = express.Router();

var database = require('../database');

//hide conference
router.post('/hide',function(req,res){
  queryp=`
  UPDATE conference SET CONF_STATUS="1" WHERE CONF_ID="${req.session.confid}"
  `;
  database.query(queryp,function(error){
    if(error){
      res.send(error);
    }
  });
  query=`
  SELECT * FROM conference WHERE CONF_ID="${req.session.confid}"
  `;
  database.query(query,function(error,data){
    if(error){
      res.send(error);
    }
    else{
      req.session.conf=data[0];
      res.redirect('hd');
    }
  });
});

router.get('/hd',function(req,res){
  res.render('conference',{session:req.session,allconf:req.session.allconf});
});

module.exports = router;