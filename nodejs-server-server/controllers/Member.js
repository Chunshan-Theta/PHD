'use strict';

var utils = require('../utils/writer.js');
var Member = require('../service/MemberService');
var sql = require('./mysql_con.js');
var cd = require('./classdefined.js');

module.exports.memberDELETE = function memberDELETE (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  Member.memberDELETE(mid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


/* ---- memberGET ----*/

module.exports.memberGET = function memberGET (req, res, next) {
  var mid = req.swagger.params['mid'].value != null ? req.swagger.params['mid'].value.split(","):[];
  var name = req.swagger.params['name'].value != null ? req.swagger.params['name'].value.split(","):[];
  var group = req.swagger.params['group'].value != null? req.swagger.params['group'].value.split(","):[];
  var permission = req.swagger.params['permission'].value != null ?req.swagger.params['permission'].value.split(","):[];
  Member.memberGET(mid,name,group,permission)
    .then(function (response) {
      if(mid.length+name.length+group.length+permission.length == 0){

        catchallmembers(function(reback){

          utils.writeJson(res,reback);
        });
      }
      else{
        catchmembers(mid,name,group,permission,function(reback){

          utils.writeJson(res,reback);
        });
      }


    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


function catchallmembers(nextstep){

  const connection = new sql('PHD');
  var querytext = "SELECT * FROM `member` ";
  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      console.log(returnValue);
      var memberlist=[];
      for(var idx in returnValue){
        const json_member = returnValue[idx];
        const class_member = new cd.member(json_member["mid"],json_member["name"],json_member["group"],json_member["permission"],[],json_member["hidden"],json_member["description"]);
        memberlist.push(class_member);
      }
      nextstep(memberlist);
  });
}

function catchmembers(mid,name,group,permission,nextstep){

  const connection = new sql('PHD');
  var querytext = "SELECT * FROM `member` WHERE 0 ";

  for(var idx in mid){
    querytext+= "OR `mid`= '"+mid[idx]+"' ";
  }
  for(var idx in name){
    querytext+= "OR `name`= '"+name[idx]+"' ";
  }
  for(var idx in group){
    querytext+= "OR `group`= '"+group[idx]+"' ";
  }
  for(var idx in permission){
    querytext+= "OR `permission`= '"+permission[idx]+"'";
  }
  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      console.log(returnValue);
      var memberlist=[];
      for(var idx in returnValue){
        const json_member = returnValue[idx];
        const class_member = new cd.member(json_member["mid"],json_member["name"],json_member["group"],json_member["permission"],[],json_member["hidden"],json_member["description"]);
        memberlist.push(class_member);
      }
      nextstep(memberlist);
  });
}
/* --------*/







/* ----   memberPOST ----*/
module.exports.memberPOST = function memberPOST (req, res, next) {
  var member = req.swagger.params['member'].value;
  Member.memberPOST(member)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


/* --------*/









/* --------*/
module.exports.memberPUT = function memberPUT (req, res, next) {
  var member = req.swagger.params['member'].value;
  Member.memberPUT(member)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
