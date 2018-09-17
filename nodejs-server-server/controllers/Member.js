'use strict';

var utils = require('../utils/writer.js');
var Member = require('../service/MemberService');
var sql = require('./mysql_con.js');
var cd = require('./classdefined.js');

module.exports.memberDELETE = function memberDELETE (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  Member.memberDELETE(mid)
    .then(function (response) {
      deletemember(mid,function(re){
          utils.writeJson(res, re);
      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};



function deletemember(mid,nextstep){

  const connection = new sql('PHD');
  var querytext = "DELETE FROM `member` WHERE `member`.`mid` = "+mid;

  connection.query(querytext, function(returnValue) {
      nextstep(returnValue);
  });
}
/*-------------------*/

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
        module.exports.catchmembers(mid,name,group,permission,function(reback){

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
        const class_member = new cd.member(json_member["mid"],json_member["name"],json_member["group"],json_member["permission"],json_member["hidden"],json_member["description"]);
        memberlist.push(class_member);
      }
      nextstep(memberlist);
  });
}

module.exports.catchmembers =function catchmembers(mid,name,group,permission,nextstep){

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
        const class_member = new cd.member(json_member["mid"],json_member["name"],json_member["group"],json_member["permission"],json_member["hidden"],json_member["description"]);
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
      console.log(member);
      var mid = member["mid"] == "NULL" ? null: member["mid"];
      var hidden = member["hidden"] == true ? "1": "0";
      const newmember = new cd.member(mid,member["name"],member["group"],member["permission"],hidden,member["description"]);
      newmember.account = member["account"];
      newmember.pws = member["pws"];
      //console.log(newmember);
      creatamember(newmember,function(re){
        utils.writeJson(res, re);
      });

    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


function creatamember(object,nextstep){

  //INSERT INTO `member` (`mid`, `account`, `pws`, `name`, `description`, `group`, `permission`, `hidden`) VALUES (NULL, 'testB', 'testB', '王君善B', '{"入學年":"2019-02-0A","指導老師":"吳穎沺"}', 'NCU_NLT', 'user', '0');
  const connection = new sql('PHD');
  //console.log(object);
  var querytext = 'INSERT INTO `member` (`mid`, `account`, `pws`, `name`, `description`, `group`, `permission`, `hidden`) VALUES (NULL, "'+object.account+'", "'+object.pws+'", "'+object.name+'", \''+object.description_str+'\', "'+object.group+'", "'+object.permission+'", "'+object.hidden+'");';
  console.log(querytext);

  connection.query(querytext, function(returnValue) {
      //console.log(returnValue);

      nextstep(returnValue);
  });
}
/* --------*/









/* --------*/
module.exports.memberPUT = function memberPUT (req, res, next) {
  var member = req.swagger.params['member'].value;
  Member.memberPUT(member)
    .then(function (response) {
      var hidden = member["hidden"] == true ? "1": "0";

      var thismember = new cd.member(member["mid"],member["name"],member["group"],member["permission"],hidden,member["description"]);
      thismember.pws = member["pws"];
      console.log(thismember);
      updatemember(thismember,function(re){

        utils.writeJson(res, re);
      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


function updatemember(m,nextstep){

    //INSERT INTO `member` (`mid`, `account`, `pws`, `name`, `description`, `group`, `permission`, `hidden`) VALUES (NULL, 'testB', 'testB', '王君善B', '{"入學年":"2019-02-0A","指導老師":"吳穎沺"}', 'NCU_NLT', 'user', '0');
    const connection = new sql('PHD');
    //console.log(object);
    var querytext = 'UPDATE `member` SET `pws`="'+m.pws+'",`name`="'+m.name+'",`permission` = "'+m.permission+'",`hidden` = "'+m.hidden+'",`description` = \''+m.description_str+'\' WHERE `member`.`mid` = '+m.mid+';'
    console.log(querytext);

    connection.query(querytext, function(returnValue) {
        //console.log(returnValue);

        nextstep(returnValue);
    });
}
