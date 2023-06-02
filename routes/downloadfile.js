var express = require('express');
var router = express.Router();

var database = require('../database');

//downloading a submitted file
router.post("/downloadfile",(req,res)=>{
  var filename = req.body.download;
  req.session.filename=filename;
  res.redirect('download');
});

router.get('/download',function(req,res){
  res.download("./public/uploads/"+req.session.filename);
});

module.exports = router;
