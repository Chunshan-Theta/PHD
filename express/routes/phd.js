var express = require('express');
var router = express.Router();
var api = require('./phd/con_api.js');
var app = require('../app');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/review', function(req, res) {
    var mid = req.param('mid', null);



    api.getsubmember(mid,function(submembers){

        
        res.render('phd/index',{"siteroot":app.siteroot,"submembers":submembers});
    });


});
module.exports = router;
