var express = require('express');
var router = express.Router();

var database = require('../database');

//adding abstract authors
router.post('/absA',function(req,res){
  var ainfo = (req.body.members).split(",");
  //query for adding abstract authors
  query =`
  INSERT INTO abs_authors (USER_ID, USER_NAME, USER_EMAIL, ABS_ID) VALUES ("${ainfo[0]}","${ainfo[2]}","${ainfo[1]}","${req.session.absId}")
  `;
  database.query(query,function(error){
    if(error){
      //Error when user already added into authors
      res.send('Author Already Exists!');
    }
    else{
      //getting all the abstracts
      query1 = `
      SELECT * FROM conf_abstract WHERE ABS_ID ="${req.session.absId}"
      `;
      database.query(query1,(error,data)=>{
        if(error){
          res.send(error);
        }
        else{
          req.session.abs = data[0];
          //getting all the abstract authors
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
              //redirecting to the /okay get method
              res.redirect('okay');
            }
          });
        }
      });
    }
  });
});

router.get('/okay',function(req,res){
  //rendering addAuth page
  res.render('addAuth',{session:req.session});
});

module.exports = router;