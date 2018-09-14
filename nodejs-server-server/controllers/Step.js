'use strict';

var utils = require('../utils/writer.js');
var Step = require('../service/StepService');
var sql = require('./mysql_con.js');
var cd = require('./classdefined.js');

module.exports.stepDELETE = function stepDELETE (req, res, next) {
  var sid = req.swagger.params['sid'].value;
  Step.stepDELETE(sid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
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
          utils.writeJson(res, steplist);}
        });
      }
      else {
        catchsteps(sid,title,group,submid,adminmid,function(steplist){
          utils.writeJson(res, steplist);}
        });
      }

    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


function catchsteps(sid,title,group,submid,adminmid,nextstep){

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
        const class_step = new cd.step(json_step["sid"],json_step["group"],json_step["title"],json_step["description"],json_step["deadline"],json_step["status"],json_step["status"]);
        steplist.push(class_step);
      }
      nextstep(steplist);
  });
}


function catchallsteps(nextstep){

  const connection = new sql('PHD');
  var querytext = "SELECT * FROM `step` ";

  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      //console.log(returnValue);
      var steplist=[];
      for(var idx in returnValue){
        const json_step = returnValue[idx];
        const class_step = new cd.step(json_step["sid"],json_step["group"],json_step["title"],json_step["description"],json_step["deadline"],json_step["status"],json_step["status"]);
        steplist.push(class_step);
      }
      nextstep(steplist);
  });
}

/*-----------------*/
module.exports.stepPOST = function stepPOST (req, res, next) {
  var member = req.swagger.params['member'].value;
  Step.stepPOST(member)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.stepPUT = function stepPUT (req, res, next) {
  var step = req.swagger.params['step'].value;
  Step.stepPUT(step)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
