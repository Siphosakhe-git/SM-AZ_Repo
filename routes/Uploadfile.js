var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/fileUpload',(req,res)=>{
  res.sendFile(__dirname + '/fileUpload.ejs');  
});


//uploading a file
router.post('/Uploadfile',(req,res)=>{
  if(req.files && req.body.pwords){
    //console.log(req.files);
    var file = req.files.file;
    var filename = file.name;

    file.mv('./public/uploads/'+filename,function(error){
      if(error){
        res.send(error);
        res.end();
      }
      else{
        var filepath = 'public/uploads/'+filename;
        query =`
        INSERT INTO paper(PAPER_NAME,CONF_ID,PAPER_WORDS,ABS_ID) VALUES ("${filename}","${req.session.confid}","${req.body.pwords}","${req.session.absId}")
        `;
        database.query(query,function(error){
          if(error){
            res.send(error);
          }
          else{
            query1 =`
            SELECT * FROM conf_abstract WHERE CONF_ID = "${req.session.confid}"
            `;
            database.query(query1,function(error,dataa){
              if(error){
                res.send(error);
              }
              else{
                //res.send(data);
                req.session.as = dataa;
                query2 =`
                SELECT * FROM conf_abstract WHERE CONF_ID = "${req.session.confid}" AND USER_ID = "${req.session.user_id}"
                `;
                database.query(query2,function(error,data2){
                  if(error){
                    res.send(error);
                  }
                  else{
                    req.session.user_abs = data2;
                    query3 =`
                    SELECT * FROM paper WHERE CONF_ID = "${req.session.confid}" AND ABS_ID = "${req.session.absId}"
                    `;
                    database.query(query3,function(error,data3){
                      if(error){
                        res.send(error);
                      }
                      else{
                        req.session.user_papers = data3;
                        res.redirect('upload');
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

router.get('/upload',function(req,res){
  res.render('addAuth',{session:req.session});
});

module.exports = router;