var express = require('express');
var router = express.Router();
var api = require('./phd/con_api.js');
var app = require('../app');
/* GET users listing. */
router.get('/', function(req, res) {
  res.redirect(app.siteroot+'/phd/login');
});

router.get('/login', function(req, res) {
  res.render('phd/login',{"siteroot":app.siteroot});
});
router.get('/review/admin', function(req, res) {
    var mid = req.param('mid', null);



    api.getsubmember(mid,function(submembers){


        res.render('phd/review_admin',{"siteroot":app.siteroot,"submembers":submembers});
    });


});

router.get('/review/user', function(req, res) {
    var mid = req.param('mid', null);



    api.getyours(mid,function(submembers){


        res.render('phd/review_user',{"siteroot":app.siteroot,"submembers":submembers});
    });


});
module.exports = router;
