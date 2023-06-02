var express = require('express');
var router = express.Router();

var database = require('../database');

//removing conf organiser
router.post('/removeO',function(req,res){
  var orgid = (req.body.deleteorg);
  var confid = req.session.confid;
  query =`
  DELETE FROM organiser WHERE USER_ID = "${orgid}" AND CONF_ID = "${confid}"
  `;//the query to delete an organiser from a conference
  database.query(query,function(error){
    if(error){
      res.send(error);
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
                  res.redirect('remo');
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/remo',function(req,res){
  res.render('addConfMembers',{session:req.session});
});

module.exports = router;
