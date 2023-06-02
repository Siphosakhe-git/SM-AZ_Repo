var express = require('express');
var router = express.Router();

var database = require('../database');

//removing paper
router.post('/removeP',function(req,res){
  var paperid = req.body.paper;
  var absId = req.session.absId;
  query =`
  DELETE FROM paper WHERE PAPER_ID = "${paperid}"
  `;//the query to delete a paper that was submitted
  database.query(query,function(error){
    if(error){
      res.send(error);
    }
    else{
      query1 = `
      SELECT * FROM conf_abstract WHERE ABS_ID ="${req.session.absId}"
      `;
      database.query(query1,(error,data)=>{
        if(error){
          res.send(error);
        }
        else{
          req.session.abs = data[0];

          query2 = `
          SELECT * FROM abs_authors WHERE ABS_ID = "${req.session.absId}"
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
                  res.redirect('remp');
                }
              });
            }
          });
        }
      });
    }
  });
});

router.get('/remp',function(req,res){
  res.render('AddAuth',{session:req.session});
});

module.exports = router;
