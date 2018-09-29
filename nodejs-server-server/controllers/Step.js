'use strict';

var utils = require('../utils/writer.js');
var Step = require('../service/StepService');
var sql = require('./mysql_con.js');
var cd = require('./classdefined.js');
/*------------*/
module.exports.stepDELETE = function stepDELETE (req, res, next) {
  //DELETE FROM `step` WHERE `step`.`sid` = 12
  var sid = req.swagger.params['sid'].value;
  Step.stepDELETE(sid)
    .then(function (response) {

      deletestep(sid,function(re){
          utils.writeJson(res, re);
      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

function deletestep(sid,nextstep){

  const connection = new sql('PHD');
  var querytext = "DELETE FROM `step` WHERE `step`.`sid` = "+sid;

  connection.query(querytext, function(returnValue) {
      nextstep(returnValue);
  });
}

/*------------*/
/*------------*/
module.exports.stepGET = function stepGET (req, res, next) {
  var sid = req.swagger.params['sid'].value != null ? req.swagger.params['sid'].value.split(","):[];
  var title = req.swagger.params['title'].value != null ? req.swagger.params['title'].value.split(","):[];
  var group = req.swagger.params['group'].value != null ? req.swagger.params['group'].value.split(","):[];
  var submid = req.swagger.params['submid'].value != null ? req.swagger.params['submid'].value.split(","):[];
  var adminmid = req.swagger.params['adminmid'].value != null ? req.swagger.params['adminmid'].value.split(","):[];
  Step.stepGET(sid,title,group,submid,adminmid)
    .then(function (response) {
      if(sid.length+title.length+group.length+submid.length+adminmid.length == 0){
        catchallsteps(function(steplist){
          utils.writeJson(res, steplist);
        });
      }
      else {
        module.exports.catchsteps(sid,title,group,submid,adminmid,function(steplist){
          utils.writeJson(res, steplist);
        });
      }

    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.catchsteps = function (sid,title,group,submid,adminmid,nextstep){

  const connection = new sql('PHD');
  var querytext = "SELECT * FROM `step` WHERE 0 ";

  for(var idx in sid){
    querytext+= "OR `sid`= '"+sid[idx]+"' ";
  }
  for(var idx in title){
    querytext+= "OR `title`= '"+title[idx]+"' ";
  }
  for(var idx in group){
    querytext+= "OR `group`= '"+group[idx]+"' ";
  }
  for(var idx in submid){
    querytext+= "OR `submid`= '"+submid[idx]+"'";
  }
  for(var idx in adminmid){
    querytext+= "OR `adminmid`= '"+adminmid[idx]+"'";
  }
  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      //console.log(returnValue);
      var steplist=[];
      for(var idx in returnValue){
        const json_step = returnValue[idx];
        //sid,group,title,deadline,log,status,description,submid,adminmid
        var date = new Date(json_step["deadline"]);
        var dateString = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.

        const class_step = new cd.step(json_step["sid"],json_step["group"],json_step["title"],dateString,json_step["log"],json_step["status"],json_step["description"],json_step["submid"],json_step["adminmid"]);
        steplist.push(class_step);
      }
      nextstep(steplist);
  });
}


function catchallsteps(nextstep){

  const connection = new sql('PHD');
  var querytext = "SELECT * FROM `step` ";

  //console.log(querytext);

  connection.query(querytext, function(returnValue) {
      //console.log(returnValue);
      var steplist=[];
      for(var idx in returnValue){
        const json_step = returnValue[idx];
        const class_step = new cd.step(json_step["sid"],json_step["group"],json_step["title"],json_step["deadline"],json_step["log"],json_step["status"],json_step["description"],json_step["submid"],json_step["adminmid"]);
        steplist.push(class_step);
      }
      nextstep(steplist);
  });
}

/*-----------------*/

module.exports.stepPOST = function stepPOST (req, res, next) {
  var step = req.swagger.params['step'].value;
  Step.stepPOST(step)
    .then(function (response) {
      //const object = step;
      console.log(step);
      newstep(step["sid"], step["group"], step["title"], step["deadline"], step["status"], step["submid"], step["adminmid"], step["description"], step["log"],function(r){
        utils.writeJson(res, r);
      });

    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

//INSERT INTO `step` (`sid`, `group`, `title`, `deadline`, `status`, `submid`, `adminmid`, `description`, `log`) VALUES (NULL, 'NCU_NLT', '入學英語測驗', '2018-09-10', NULL, '1', '3', '所有新生須參加，未達門檻者由指導教授加以訓練後通過。', NULL);

function newstep(sid, group, title, deadline, status, submid, adminmid, description, log,nextstep){

  const connection = new sql('PHD');
  status = status != -1 ? status:null;
  sid = sid != "NULL" ? sid:null;
  adminmid = adminmid != "NULL" ? adminmid:null;
  var querytext = "INSERT INTO `step` (`sid`, `group`, `title`, `deadline`, `status`, `submid`, `adminmid`, `description`, `log`) VALUES (NULL, '"+group+"', '"+title+"', '"+deadline+"', "+status+", '"+submid+"', "+adminmid+", '"+description+"', '"+log+"');";

  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      nextstep(returnValue);
  });
}

/*-----------------*/




/*-----------------*/
//UPDATE `step` SET `submid` = '1' WHERE `step`.`sid` = 11;
module.exports.stepPUT = function stepPUT (req, res, next) {
  var step = req.swagger.params['step'].value;

  Step.stepPUT(step)
    .then(function (response) {
      if(step['sid'] == "NULL"){
        utils.writeJson(res, {"error":"bad input: not defined var: sid"},400);
      }


      updatestep(step,function(re){
        utils.writeJson(res, re);
      });

    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

function updatestep(object,nextstep){
  //UPDATE `step` SET `adminmid` = '3',`title`="test",`deadline` = "2018-09-21",`status` = "0",`description` = "test",`log`="somethings" WHERE `step`.`sid` = 1;

  const connection = new sql('PHD');
  var querytext = 'UPDATE `step` SET `title`="'+object['title']+'",`deadline` = "'+object['deadline']+'",`status` = "'+object['status']+'",`description` = "'+object['description']+'",`log`="'+object['log']+'" WHERE `step`.`sid` = '+object['sid']+';'
  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      nextstep(returnValue);
  });
}
