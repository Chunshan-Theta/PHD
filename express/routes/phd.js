var express = require('express');
var router = express.Router();
var api = require('./phd/con_api.js');
var app = require('../app');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/review', function(req, res) {
    //var user = req.param('user', null);



    api.getsubmember(function(submembers){

        console.log(submembers);
        var Demosubmembers= {
          "members": [member1,member2,member3]
        };
        res.render('phd/index',{"siteroot":app.siteroot,"submembers":Demosubmembers});
    });


});
module.exports = router;
