var express = require('express');
var router = express.Router();
var api = require('./phd/con_api.js');
var app = require('../app');
var md5 = require('js-md5');

/* GET users listing. */
router.get('/', function(req, res) {
  var tag = req.param('tag', null);
  console.log(tag);
  if(!req.session.user || !req.session.user[tag]) {
    console.log(req.session.user);
    //console.log("req.sc.tag: "+req.sc.tag);
    res.redirect(app.siteroot+'/phd/login');
  }else{
    console.log(req.session.user[tag]['name']);
    res.redirect(req.session.user[tag]['homepage']+'?tag='+tag);
  }

});
router.get('/logout', function(req, res) {
  var tag = req.param('tag', null);
  req.session.user[tag]=null;
  console.log(req.session.user[tag]);
  res.redirect(app.siteroot+'/phd/login');
});
router.get('/login', function(req, res) {

  res.render('phd/login',{"siteroot":app.siteroot});
});
router.post('/login', function(req, res) {
  var account = req.param('account', null);
  var pws = req.param('pws', null);

  api.login(account,pws,function(status,re){
      if(!req.session.user) {
        req.session.user={};
      }
      if(status){
        //req.session.user['homepage'] = app.siteroot+'/phd/review/'+re['permission']+"/";
        //res.redirect(app.siteroot+'/phd/review/'+re['permission']+"/?mid="+re['mid']);
        //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        //console.log(ip);
        const tag = md5(re['mid']+re['name']+Date.now());
        req.session.user[tag]={};
        req.session.user[tag]['homepage']=app.siteroot+'/phd/review/'+re['permission']+"/";
        req.session.user[tag]['name']=re['name'];
        req.session.user[tag]['mid']=re['mid'];
        req.session.user[tag]['permission']=re['permission'];
        //res.send(app.siteroot+'/phd/review/'+re['permission']+"/");
        res.send(tag);

      }else{
        res.send("error: "+re);
      }
  });



  //res.render('phd/login',{"siteroot":app.siteroot});
});
router.get('/review/admin', function(req, res) {
  var tag = req.param('tag', null);
  var mid = req.session.user[tag]['mid'];
  var permission = req.session.user[tag]['permission'];
  if(permission!='admin'){
    res.redirect(app.siteroot+'/phd/login');
  }
  api.getsubmember(mid,function(submembers){


      res.render('phd/review_admin',{"siteroot":app.siteroot,"submembers":submembers});
  });


});

router.get('/review/user', function(req, res) {
    var tag = req.param('tag', null);
    var mid = req.session.user[tag]['mid'];
    //console.log(req.session.user['homepage']);
    api.getyours(mid,function(submembers){


        res.render('phd/review_user',{"siteroot":app.siteroot,"submembers":submembers});
    });


});

/////


router.get('/newsubmember', function(req, res) {
  var group = req.param('group', null);
  var today = new Date().toLocaleDateString();
  res.render('phd/newsubmember',{"siteroot":app.siteroot,"group":group,"today":today});
});
router.post('/newsubmember', function(req, res) {
  var account = req.param('account', null);
  var pws = req.param('pws', null);
  var name = req.param('name', null);
  var entertime = req.param('entertime', null);
  var teacher = req.param('teacher', null);
  var group = req.param('group', null);


  api.newsubmember(account,pws,name,entertime,teacher,group,function(pass,content){
      
      if(pass){
        res.send('business api completed,ID :'+content);
      }
      else {
        res.send('error: '+content);
      }

  });
});
module.exports = router;
