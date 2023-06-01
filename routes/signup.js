var express = require('express');
var router = express.Router();

var database = require('../database');

//creating a new user account
router.post('/signup', function(request, response, next){
  var user_name = request.body.user_name;
  var user_email = request.body.user_email;
  var user_domain = request.body.user_domain;
  var user_pword = request.body.user_pword;
  var cpword = request.body.cpword;

  if(user_name && user_email && user_domain && user_pword && cpword){
    query = `
    INSERT INTO user (USER_EMAIL,USER_PWORD,USER_NAME,USER_DOMAIN) VALUES("${user_email}","${user_pword}","${user_name}","${user_domain}")
    `;

    if(user_pword == cpword){
      database.query(query,function(error){
        if(error){
          throw error;
        }
        else{
          response.send('Account Created! Need  to fill Area of Expertise Form.');
          response.end();
        }
      });
    }
    else{
      response.send('Password does not match!')
      response.end();
    }
  }
  else{
    response.send('All Fields Required!');
    response.end();
  }
});

module.exports = router;