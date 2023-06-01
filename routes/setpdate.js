var express = require('express');
var router = express.Router();

var database = require('../database');

//setting paper due date
router.post('/setpdate',(req,res)=>{
  var datetime=req.body.datet;
  var confid=(req.session.confid);
  //res.send(confid);
  if(datetime){
    query =`
    UPDATE conference SET PAPER_DUEDATE="${datetime}" WHERE CONF_ID = "${confid}"
    `;
    database.query(query,(error)=>{
      if(error){
        res.send(error);
      }
      else{
        query1 = `
        SELECT * FROM conference WHERE CONF_ID = "${confid}"
        `;
        database.query(query1,(error,data)=>{
          if(error){
            res.send(error);
          }
          else{
            req.session.conf=data[0];
            res.redirect('setpd');
          }
        });
      }
    });
  }
  else{
    res.send('Please Insert Date and Time');
  }
});

router.get('/setpd',function(req,res){
  res.render('conference',{session:req.session});
});

module.exports = router;