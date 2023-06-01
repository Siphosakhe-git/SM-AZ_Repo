var express = require('express');
var router = express.Router();

var database = require('../database');

//logging in
router.post('/login', function(request, response){
  var user_email = request.body.user_email;
  var user_pword = request.body.user_pword;

  if(user_email && user_pword){
    query = `
    SELECT * FROM user WHERE USER_EMAIL = "${user_email}"
    `;

    database.query(query, function(error, data){

      if(data.length > 0){

        for(var c=0; c<data.length;c++){

          if(data[c].USER_PWORD == user_pword){
            request.session.user_id = data[c].USER_ID;
            request.session.user_name = data[c].USER_NAME;
            request.session.user_email = data[c].USER_EMAIL;

            query1 = `
            SELECT * FROM conference
            `;
            database.query(query1,(error,data1)=>{
              if(error){
                response.send(error);
              }
              else{
                request.session.allconf = data1;
                query2 = `
                SELECT * FROM user
                `;
                database.query(query2,(error,datau)=>{
                  if(error){
                    response.send(error);
                  }
                  else{
                    request.session.allUsers=datau;
                    //res.send(req.session.allUsers)
                    if(user_email.includes("cmt.admin")){
                      request.session.isAd=1;
                    }
                    else{
                      request.session.isAd=0;
                    }
                    response.redirect('success');
                  }
                });
              }
            });
          }
          else{
            response.send('Incorrect Password!');
          }

        }

      }
      else{
        response.send('Incorrect Email Address!');
      }
    });
  }
  else{
    response.send('Please Enter Your Details!');
  }
});

router.get('/success',function(req,res){
  res.render('home', {session : req.session,allconf : req.session.allconf});
});

module.exports = router;