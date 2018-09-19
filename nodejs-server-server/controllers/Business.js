'use strict';

var utils = require('../utils/writer.js');
var Business = require('../service/BusinessService');
var cd = require('./classdefined.js');
var MemberApi = require('./Member.js');
var StepApi = require('./Step.js');

module.exports.logintestGET = function logintestGET (req, res, next) {
  var account = req.swagger.params['account'].value;
  var pws = req.swagger.params['pws'].value;
  Business.logintestGET(account,pws)
    .then(function (response) {
      var mainm = MemberApi.catchmembers([],[],[],[],function(re){
        console.log(re);
        if(re.length==0){
          utils.writeJson(res, {"content":"the account note register"},404);
        }else if(re[0]['pws']==pws){
          utils.writeJson(res, re);
        }else {
          utils.writeJson(res, {"content":"passwords error"},400);
        }

      },[account]);
      //utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};





module.exports.submembersGET = function submembersGET (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  Business.submembersGET(mid)
    .then(function (response) {
      var mainm = MemberApi.catchmembers(mid,[],[],[],function(re){
        if(re.length == 0){
          utils.writeJson(res, {"content":"not find the mid"},404);
        }
        //console.log(re[0]);
        const group = re[0]['group'];
        var thissubmembers = MemberApi.catchmembers([],[],[group],[],function(re2){
          //console.log(re2);
          var submids = [];
          var submids_obj = {};
          for(var idx in re2){
            const stu = re2[idx];
            if(stu["permission"]=="user"){
              //console.log(stu['mid']);
              submids.push(stu['mid']);
              const class_submember = new cd.submember(stu['mid'],stu['name'],stu['group'],stu['permission'],[],stu['hidden'],JSON.stringify(stu['description']));
              submids_obj[stu['mid']]=class_submember;
            }
            //console.log(submids_obj);


            if(idx == re2.length-1){
              StepApi.catchsteps([],[],[],submids,[],function(re3){

                for(var idx_re3 in re3){
                  const step = re3[idx_re3];

                  submids_obj[step['submid']].steps.push(step);
                  if(idx_re3 == re3.length-1){
                    var re_obj={};
                    re_obj['members'] =[];
                    for(var key in submids_obj){
                      re_obj['members'].push(submids_obj[key]);
                    }
                    utils.writeJson(res, re_obj);
                  }
                }
              });
            }
          }
        });

      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.submemberGET = function submemberGET (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  Business.submemberGET(mid)
    .then(function (response) {
      var mainm = MemberApi.catchmembers(mid,[],[],[],function(re){
        if(re.length == 0){
          utils.writeJson(res, {"content":"not find the mid"},404);
        }

        const stu = re[0];
        var class_submember = new cd.submember(stu['mid'],stu['name'],stu['group'],stu['permission'],[],stu['hidden'],JSON.stringify(stu['description']));

        StepApi.catchsteps([],[],[],[stu['mid']],[],function(re3){
          if(re3.length==0){
            var re_obj={};
            re_obj['members'] =[];
            re_obj['members'].push(class_submember);
            utils.writeJson(res, re_obj);
          }
          for(var idx_re3 in re3){
            const step = re3[idx_re3];
            class_submember.steps.push(step);

            if(idx_re3 == re3.length-1){
              var re_obj={};
              re_obj['members'] =[];
              re_obj['members'].push(class_submember);
              utils.writeJson(res, re_obj);
            }
          }
        });

      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
