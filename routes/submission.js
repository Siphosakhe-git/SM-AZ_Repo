var express = require('express');
var router = express.Router();

var database = require('../database');

//action for submission button
router.post("/submission",function(req,res){
  req.session.papers=[];
  query =`
  SELECT * FROM PAPER WHERE CONF_ID = "${req.session.confid}"
  `;
  database.query(query,function(error,data){
    if(error){
      res.send(error);
    }
    else{
      //res.send(data);
      req.session.papers = data;
      query1 =`
      SELECT * FROM conf_abstract WHERE CONF_ID = "${req.session.confid}"
      `;
      database.query(query1,function(error,dataa){
        if(error){
          res.send(error);
        }
        else{
          //res.send(data);
          req.session.as = dataa;
          query2 =`
          SELECT * FROM conf_abstract WHERE CONF_ID = "${req.session.confid}" AND USER_ID = "${req.session.user_id}"
          `;
          database.query(query2,function(error,data2){
            if(error){
              res.send(error);
            }
            else{
              req.session.user_abs = data2;
              query3 =`
              SELECT * FROM paper WHERE CONF_ID = "${req.session.confid}" AND ABS_ID = "${req.session.absId}"
              `;
              database.query(query3,function(error,data3){
                if(error){
                  res.send(error);
                }
                else{
                  req.session.user_papers = data3;
                  res.redirect('sub');
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/sub',function(req,res){
  res.render('fileUpload',{session:req.session});
});

module.exports = router;