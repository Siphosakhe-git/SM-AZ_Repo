var express = require('express');
var router = express.Router();

var database = require('../database');

//adding conference area chairs
router.post('/addac',function(req,res){
  var ainfo = (req.body.addac).split(",");
  query =`
  INSERT INTO areachair (CONF_ID,USER_ID, USER_NAME, USER_EMAIL) VALUES ("${req.session.confid}","${ainfo[0]}","${ainfo[2]}","${ainfo[1]}")
  `;
  database.query(query,function(error){
    if(error){
      res.send('Area Chair Already Added!');
    }
    else{
      query1 = `
      SELECT * FROM organiser WHERE CONF_ID ="${req.session.confid}"
      `;
      database.query(query1,(error,data)=>{
        if(error){
          res.send(error);
        }
        else{
          req.session.orgs = data;
          query2 = `
          SELECT * FROM areachair WHERE CONF_ID ="${req.session.confid}"
          `;
          database.query(query2,(error,dataa)=>{
            if(error){
              res.send(error);
            }
            else{
              req.session.ac = dataa;
              query3 = `
              SELECT * FROM reviewer WHERE CONF_ID ="${req.session.confid}"
              `;
              database.query(query3,(error,datar)=>{
                if(error){
                  res.send(error);
                }
                else{
                  req.session.reviewers = datar;
                  res.redirect('addc');
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/addc',function(req,res){
  res.render('addConfMembers',{session:req.session});
});

module.exports = router;