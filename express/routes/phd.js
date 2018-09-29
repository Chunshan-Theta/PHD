var express = require('express');
var router = express.Router();
var api = require('./phd/con_api.js');
var app = require('../app');
var md5 = require('js-md5');

/* GET users listing. */
router.get('/', function(req, res) {
  console.log("into page: /");
  var tag = req.param('tag', null);
  if(tag==null) {
    // user first coming
    console.log("!req.session.user || tag==null ");
    //console.log("req.sc.tag: "+req.sc.tag);
    res.redirect(app.siteroot+'/phd/login');
  }else if (!req.session.user || !req.session.user[tag]) {

    // server restart
    // user login license time out.
    console.log("!req.session.user[tag]");
    res.redirect(app.siteroot+'/phd/logout');
  }
  else{
    // The user logined.
    console.log(req.session.user[tag]['name']);
    res.redirect(req.session.user[tag]['homepage']+'?tag='+tag);
  }

});
router.get('/logout', function(req, res) {
  console.log("into page: /logout");
  var tag = req.param('tag', null);
  if(tag==null){
    res.render('phd/logout',{"siteroot":app.siteroot});
  }else {
    req.session.user[tag]=null;
    res.render('phd/logout',{"siteroot":app.siteroot});
  }

});
router.get('/login', function(req, res) {
  console.log("into page: /login");
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
        req.session.user[tag]['group']=re['group'];
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
  if(!req.session.user || !req.session.user[tag]){
    res.redirect(app.siteroot+'/phd/login');
  }else {
    var mid = req.session.user[tag]['mid'];
    var group = req.session.user[tag]['group'];
    var permission = req.session.user[tag]['permission'];
    if(permission!='admin'){
      res.redirect(app.siteroot+'/phd/login');
    }
    api.getsubmember(mid,function(submembers){


        res.render('phd/review_admin',{"siteroot":app.siteroot,"submembers":submembers,"group":group});
    });
  }



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
  var date = new Date();
  var dateString = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  res.render('phd/newsubmember',{"siteroot":app.siteroot,"group":group,"today":dateString});
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
        res.send(''+content);
      }
      else {
        res.send('error: '+content);
      }

  });
});


////
router.get('/newstep', function(req, res) {
  var group = req.param('group', null);
  var submid = req.param('submid', null);
  var date = new Date();
  var dateString = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  res.render('phd/newstep',{"siteroot":app.siteroot,"group":group,"submid":submid,"today":dateString});
});

router.post('/newstep', function(req, res) {
  var steps = req.param('steps', null)==null?null:JSON.parse(req.param('steps', null));
  if(steps==null){
    res.status(400);
    res.send("end");
  }
  for(var idx in steps){
    //console.log(steps[idx]);
    api.NewStep(steps[idx],function(content){
        console.log(content);
    });
    if(idx>=steps.length-1)res.send("completed!");

  }

  //res.render('phd/newstep',{"siteroot":app.siteroot,"group":group,"today":today});
});

router.get('/editstep', function(req, res) {
  var stepId = req.param('stepId', null);
  var stepTitle = req.param('stepTitle', null);
  var stepDescription = req.param('stepDescription', null);
  var stepStatus = req.param('stepStatus', null);
  var stepLog = req.param('stepLog', null);
  var stepDeadline = req.param('stepDeadline', null);
  /*
  var stepId = '29';
  var stepTitle = '123';
  var stepDescription = '123';
  var stepStatus = '-1';
  var stepLog = '123';
  var stepDeadline = '2018-09-28';
  */
  res.render('phd/editstep',{"siteroot":app.siteroot,"stepId":stepId,"stepTitle":stepTitle,"stepDescription":stepDescription,"stepStatus":stepStatus,"stepLog":stepLog,"stepDeadline":stepDeadline});
});

router.post('/editstep', function(req, res) {
  var stepId = req.param('stepId', null);
  var stepTitle = req.param('stepTitle', null);
  var stepDescription = req.param('stepDescription', null);
  var stepStatus = req.param('stepStatus', null);
  var stepLog = req.param('stepLog', null);
  var stepDeadline = req.param('stepDeadline', null);
  var step={};
  step['sid']=stepId;
  step['title']=stepTitle;
  step['description']=stepDescription;
  step['status']=stepStatus;
  step['log']=stepLog;
  step['deadline']=stepDeadline;


  api.editStep(step,function(content){
      console.log(content);
      content = JSON.parse(content);
      if(!content['errno']){
        res.send("completed!");
      } else{
        res.send("typing error");
      }

  });

});


router.get('/editsubmember', function(req, res) {
  var memberName = req.param('memberName', null);
  var memberId = req.param('memberId', null);
  var memberDescription = req.param('memberDescription', null)==null?null:JSON.parse(req.param('memberDescription', null));
  console.log(memberDescription);
  /*
  var stepId = '29';
  var stepTitle = '123';
  var stepDescription = '123';
  var stepStatus = '-1';
  var stepLog = '123';
  var stepDeadline = '2018-09-28';
  */
  res.render('phd/editsubmember',{"siteroot":app.siteroot,"memberId":memberId,"memberName":memberName,"enterTime":memberDescription["入學年"],"memberTeacher":memberDescription["指導教授"]});
});

router.post('/editsubmember', function(req, res) {
  var memberName = req.param('memberName', null);
  var memberId = req.param('memberId', null);
  var memberDescription = req.param('memberDescription', null)==null?null:JSON.parse(req.param('memberDescription', null));
  console.log("memberDescription: ",memberDescription);
  console.log("memberName: ",memberName);
  console.log("memberId: ",memberId);
  api.editSubMember(memberName,memberId,memberDescription,function(content){
      console.log(content);
      content = JSON.parse(content);
      if(!content['errno']){
        res.send("completed!");
      } else{
        res.send("typing error");
      }

  });
  /*
  var stepId = '29';
  var stepTitle = '123';
  var stepDescription = '123';
  var stepStatus = '-1';
  var stepLog = '123';
  var stepDeadline = '2018-09-28';
  */
  });

router.post('/deleteSubmember', function(req, res) {
  var memberId = req.param('memberId', null);
  console.log("memberId: ",memberId);

  api.deleteSubMember(memberId,function(content){
      console.log(content);
      content = JSON.parse(content);
      if(!content['errno']){
        res.send("completed!");
      } else{
        res.send("typing error");
      }

  });
});

router.post('/deleteStep', function(req, res) {
  var stepId = req.param('stepId', null);
  console.log("stepId: ",stepId);
  api.deleteStep(stepId,function(content){
      console.log(content);
      content = JSON.parse(content);
      if(!content['errno']){
        res.send("completed!");
      } else{
        res.send("typing error");
      }

  });
});

module.exports = router;
