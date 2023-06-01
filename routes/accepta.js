var express = require('express');
var router = express.Router();

var database = require('../database');

//accept abstract
router.post('/accepta',function(req,res){
  query =`
  UPDATE conf_abstract SET ABS_STATUS="Accepted" WHERE ABS_ID = "${req.session.absId}"
  `;
  database.query(query,function(error){
    if(error){
      res.send(error);
    }
    else{
      query1 =`
      SELECT * FROM conf_abstract WHERE ABS_ID = "${req.session.absId}"
      `;
      database.query(query1,function(error,data){
        if(error){
          res.send(error);
        }
        else{
          req.session.abs=data[0];
          res.redirect('accept');
        }
      });
    }
  });
});

router.get('/accept',function(req,res){
  res.render('addAuth',{session:req.session});
});

module.exports = router;