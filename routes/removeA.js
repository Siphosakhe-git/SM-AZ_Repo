var express = require('express');
var router = express.Router();

var database = require('../database');

//removing abstract authors
router.post('/removeA',function(req,res){
  var ainfo = (req.body.members).split(",");
  var absId = req.session.absId;
  query =`
  DELETE FROM abs_authors WHERE USER_ID = "${ainfo[0]}" AND ABS_ID = "${absId}"
  `;//the query to delete an author from database
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
              res.redirect('rema');
            }
          });
        }
      });
    }
  });
});

router.get('/rema',function(req,res){
  res.render('addAuth',{session:req.session});
});

module.exports = router;
