var express = require('express');
var router = express.Router();

var database = require('../database');

//Abstract submission
router.post('/abstract',function(req,res){
  var abs = req.body.abs;
  //making a new abstract
  query =`
  INSERT INTO conf_abstract (CONF_ID,ABS_CONTENT,USER_ID) VALUES ("${req.session.confid}","${abs}","${req.session.user_id}")
  `;
  if(abs){
    database.query(query,function(error,data){
      if(error){
        res.send(error);
      }
      else{
        req.session.absId = data.insertId;
        //inserting the owner of the abstract as an author
        queryA =`
        INSERT INTO abs_authors (USER_ID, USER_NAME, USER_EMAIL, ABS_ID) VALUES ("${req.session.user_id}","${req.session.user_name}","${req.session.user_email}","${req.session.absId}")
        `;
        database.query(queryA,function(error){
          if(error){
            res.send(error);
          }
        });
        //getting the new abstract
        query1 = `
        SELECT * FROM conf_abstract WHERE ABS_ID ="${req.session.absId}"
        `;
        database.query(query1,(error,data)=>{
          if(error){
            res.send(error);
          }
          else{
            req.session.abs = data[0];
            //getting the authors of the abtstract
            query2 = `
            SELECT * FROM abs_authors WHERE ABS_ID = "${req.session.absId}"
            `;
            database.query(query2,(error,datau)=>{
              if(error){
                res.send(error);
              }
              else{
                req.session.absAs=datau;
                //redirecting to  the /valid get method
                res.redirect('valid');
              }
            });
          }
        });
      }
    });
  }
  else{
    res.send('Empty Field Not Required!');
  }
});

router.get('/valid',function(req,res){
  //rendering the addAuth page
  res.render('addAuth',{session:req.session});
});

module.exports = router;