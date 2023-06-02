var express = require('express');
var router = express.Router();

var database = require('../database');

//editing conf summary
router.post('/editconfsumm',(req,res,next)=>{
  var confid = req.session.confid;
  var confsumm =req.body.confsumm;

  if(confid && confsumm){

    equery =`
    UPDATE conference SET CONF_SUMMARY="${confsumm}" WHERE CONF_ID = "${confid}"
    `; //above queriy allows the admin to edit conference summary regarding the conference

    database.query(equery,function(error){
      if(error){
        res.send(error);
      }
    });

    oquery = `
    SELECT * FROM organiser WHERE CONF_ID = "${confid}" and USER_ID = "${req.session.user_id}"
    `;//get relevant data

    aquery = `
    SELECT * FROM areachair WHERE CONF_ID = "${confid}" and USER_ID = "${req.session.user_id}"
    `;//get relevant data

    rquery = `
    SELECT * FROM reviewer WHERE CONF_ID = "${confid}" and USER_ID = "${req.session.user_id}"
    `;//get relevant data

    query = `
    SELECT * FROM conference WHERE CONF_ID = "${confid}"
    `;//get relevant data
    database.query(query,(error,data)=>{
      if(error){
        res.send(error);
      }
      else{
        req.session.conf = data[0];
        query1 = `
        SELECT * FROM organiser WHERE CONF_ID = "${confid}"
        `;
        database.query(query1,(error,datao)=>{
          if(error){
            res.send(error);
          }
          else{
              req.session.orgs = datao;
              // res.send(((req.session.confname).CONF_NAME)+((req.session.confname).CONF_ID));
              //res.send((req.session.orgs[0]).USER_NAME)
              query2 = `
              SELECT * FROM areachair WHERE CONF_ID = "${confid}"
              `;
              database.query(query2,(error,dataa)=>{
                if(error){
                  res.send(error);
                }
                else{
                    req.session.ac = dataa;
                    // res.send(((req.session.confname).CONF_NAME)+((req.session.confname).CONF_ID));
                    //res.send((req.session.orgs[0]).USER_NAME)
                    query3 = `
                    SELECT * FROM reviewer WHERE CONF_ID = "${confid}"
                    `;
                    database.query(query3,(error,datar)=>{
                      if(error){
                        res.send(error);
                      }
                      else{
                          req.session.rs = datar;
                          // res.send(((req.session.confname).CONF_NAME)+((req.session.confname).CONF_ID));
                          //res.send((req.session.orgs[0]).USER_NAME)

                          database.query(oquery,function(error,datao){
                            if(error){
                              res.send(error);
                            }
                            if(datao.length>0){
                              req.session.isOrg=1;
                            }
                            else{
                              req.session.isOrg=0;
                            }
                            database.query(aquery,function(error,dataa){
                              if(error){
                                res.send(error);
                              }
                              if(dataa.length>0){
                                req.session.isAc=1;
                              }
                              else{
                                req.session.isAc=0;
                              }
                              database.query(rquery,function(error,datar){
                                if(error){
                                  res.send(error);
                                }
                                if(datar.length>0){
                                  req.session.isR=1;
                                }
                                else{
                                  req.session.isR=0;
                                }

                                res.redirect('edits');

                              });
                            });
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
});

router.get('/edits',function(req,res){
  res.render('conference',{session:req.session});
});

module.exports = router;
