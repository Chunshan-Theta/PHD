'use strict';

var utils = require('../utils/writer.js');
var Business = require('../service/BusinessService');
var cd = require('./classdefined.js');
var MemberApi = require('./Member.js');


module.exports.submembersGET = function submembersGET (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  Business.submembersGET(mid)
    .then(function (response) {
      var mainm = MemberApi.catchmembers(mid,[],[],[],function(re){
        if(re.length == 0){
          utils.writeJson(res, {"content":"not find the mid"},404);
        }
        const group = re[0]['group'];
        var thissubmembers = MemberApi.catchmembers([],[],[group],[],function(re2){
          //console.log(re2);
          utils.writeJson(res, re2);
        });
      });

      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
