var express = require('express');
var router = express.Router();

var database = require('../database');

//adding abstract authors
router.post('/absA',function(req,res){
  var ainfo = (req.body.members).split(",");
  query =`
  INSERT INTO abs_authors (USER_ID, USER_NAME, USER_EMAIL, ABS_ID) VALUES ("${ainfo[0]}","${ainfo[2]}","${ainfo[1]}","${req.session.absId}")
  `;
  database.query(query,function(error){
    if(error){
      res.send('Author Already Exists!');
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
              //res.send(req.session.allUsers)
              res.redirect('okay');
            }
          });
        }
      });
    }
  });
});

router.get('/okay',function(req,res){
  res.render('addAuth',{session:req.session});
});

module.exports = router;