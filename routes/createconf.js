var express = require('express');
var router = express.Router();

var database = require('../database');

//creating a new conference
router.post('/createconf',function(req,res){
  var confname = req.body.confname;
  var confsumm = req.body.confsumm;
  var confwords = req.body.confwords;
  var confm = req.body.conftype;
  // res.send("|||"+confname+"|"+confsumm+"|"+confwords+"|"+confm);
  // res.end();
  if(confname && confsumm && confwords && confm){
    query =`
    INSERT INTO conference (CONF_NAME,CONF_MODE,CONF_SUMMARY,CONF_KEYWORDS) VALUES ("${confname}","${confm}","${confsumm}","${confwords}")
    `;//add all provided data in the conference table on the database
    database.query(query,function(error,data){
      if(error){
        res.send(error);
      }
      else{
        req.session.confid = data.insertId;
        query1 = `
        SELECT * FROM conference WHERE CONF_ID ="${req.session.confid}"
        `;
        database.query(query1,(error,data)=>{
          if(error){
            res.send(error);
          }
          else{
            req.session.abs = data[0];

            query2 = `
            SELECT * FROM organiser WHERE CONF_ID = "${req.session.confid}"
            `;
            database.query(query2,(error,datau)=>{
              if(error){
                res.send(error);
              }
              else{
                req.session.orgs=datau;
                //res.send(req.session.allUsers)
                query3 = `
                SELECT * FROM areachair WHERE CONF_ID = "${req.session.confid}"
                `;
                database.query(query3,(error,dataac)=>{
                  if(error){
                    res.send(error);
                  }
                  else{
                    req.session.ac=dataac;
                    //res.send(req.session.allUsers)
                    query4 = `
                    SELECT * FROM reviewer WHERE CONF_ID = "${req.session.confid}"
                    `;
                    database.query(query4,(error,datar)=>{
                      if(error){
                        res.send(error);
                      }
                      else{
                        req.session.reviewers=datar;
                        //res.send(req.session.allUsers)
                        res.redirect('create');
                      }
                    });
                  }
                });
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

router.get('/create',function(req,res){
  res.render('addConfMembers',{session:req.session});
});

module.exports = router;
