var express = require('express');
var router = express.Router();

var database = require('../database');

//viewing abstract
router.post('/viewabs', function(req, res, next) {
  req.session.absId=req.body.viewabstract
  var absid =req.session.absId;
  query1 = `
  SELECT * FROM conf_abstract WHERE ABS_ID ="${absid}"
  `;
  database.query(query1,(error,data)=>{
    if(error){
      res.send(error);
    }
    else{
      req.session.abs = data[0];

      query2 = `
      SELECT * FROM abs_authors WHERE ABS_ID = "${absid}"
      `;
      database.query(query2,(error,datau)=>{
        if(error){
          res.send(error);
        }
        else{
          req.session.absAs=datau;
          query3 =`
          SELECT * FROM paper WHERE CONF_ID = "${req.session.confid}" AND ABS_ID = "${req.session.absId}"
          `;
          database.query(query3,function(error,data3){
            if(error){
              res.send(error);
            }
            else{
              req.session.user_papers = data3;
              res.redirect('viewa');
            }
          });
        }
      });
    }
  });
});

router.get('/viewa',function(req,res){
  res.render('addAuth',{session:req.session});
});

module.exports = router;