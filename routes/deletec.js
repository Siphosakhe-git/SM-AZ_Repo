var express = require('express');
var router = express.Router();

var database = require('../database');

//removing a conference
router.post('/deletec',function(req,res){
  var confid = req.session.confid;
  queryo =`
  DELETE FROM organiser WHERE CONF_ID = "${confid}"
  `;//the assigned organiser is removed
  querya =`
  DELETE FROM areachair WHERE CONF_ID = "${confid}"
  `;//the assigned area chair is removed
  queryr =`
  DELETE FROM reviewer WHERE CONF_ID = "${confid}"
  `;//the assigned reviewer is removed
  queryabs =`
  DELETE FROM conf_abstract WHERE CONF_ID = "${confid}"
  `;//the the abstract that was submitted is removed
  database.query(queryo,function(error){
    if(error){
        res.send(error);
    }
  });
  database.query(querya,function(error){
    if(error){
        res.send(error);
    }
  });
  database.query(queryr,function(error){
    if(error){
        res.send(error);
    }
  });
  database.query(queryabs,function(error){
    if(error){
        res.send(error);
    }
  });
  queryc =`
  DELETE FROM conference WHERE CONF_ID = "${confid}"
  `;//the selected conference is deleted
  database.query(queryc,function(error){
    if(error){
        res.send(error);
    }
  });
  res.redirect('delete');
});

router.get('/delete',function(req,res){
    query=`
    SELECT * FROM conference
    `;
    database.query(query,function(error,data){
        if(error){
        res.send(error);
        }
        else{
        req.session.allconf=data;
        res.render('home',{session:req.session,allconf:req.session.allconf});
        }
    });
});

module.exports = router;
