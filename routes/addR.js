var express = require('express');
var router = express.Router();

var database = require('../database');

//adding conference reviewer
router.post('/addR',function(req,res){
  var ainfo = (req.body.addr).split(",");
  query =`
  INSERT INTO reviewer (CONF_ID,USER_ID, USER_NAME, USER_EMAIL) VALUES ("${req.session.confid}","${ainfo[0]}","${ainfo[2]}","${ainfo[1]}")
  `;//inserting the added person by the admin as a reviewer
  database.query(query,function(error){
    if(error){
      res.send('Reviewer Already Added!');
    }
    else{
      query1 = `
      SELECT * FROM organiser WHERE CONF_ID ="${req.session.confid}"
      `;//get relevant data
      database.query(query1,(error,data)=>{
        if(error){
          res.send(error);
        }
        else{
          req.session.orgs = data;
          query2 = `
          SELECT * FROM areachair WHERE CONF_ID ="${req.session.confid}"
          `;//get relevant data
          database.query(query2,(error,dataa)=>{
            if(error){
              res.send(error);
            }
            else{
              req.session.ac = dataa;
              query3 = `
              SELECT * FROM reviewer WHERE CONF_ID ="${req.session.confid}"
              `;//get relevant data
              database.query(query3,(error,datar)=>{
                if(error){
                  res.send(error);
                }
                else{
                  req.session.reviewers = datar;
                  res.redirect('addrr');
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/addrr',function(req,res){
  res.render('addConfMembers',{session:req.session});
});

module.exports = router;
