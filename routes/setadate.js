var express = require('express');
var router = express.Router();

var database = require('../database');


//setting abstract due date
router.post('/setadate',(req,res)=>{
  var datetime=req.body.datet;
  var confid=(req.session.confid);
  //res.send(confid);
  if(datetime){
    query =`
    UPDATE conference SET ABS_DUEDATE="${datetime}" WHERE CONF_ID = "${confid}"
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
            res.redirect('setad');
          }
        });
      }
    });
  }
  else{
    res.send('Please Insert Date and Time');
  }
});

router.get('/setad',function(req,res){
  res.render('conference',{session:req.session});
});

module.exports = router;