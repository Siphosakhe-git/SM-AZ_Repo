var express = require('express');
var router = express.Router();

var database = require('../database');

//removing conf area chair
router.post('/removeAc',function(req,res){
  var acid = (req.body.deleteac);
  var confid = req.session.confid;
  query =`
  DELETE FROM areachair WHERE USER_ID = "${acid}" AND CONF_ID = "${confid}"
  `;//the query to delete anarea chair from a certain conference
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
                  res.redirect('remac');
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/remac',function(req,res){
  res.render('addConfMembers',{session:req.session});
});

module.exports = router;
