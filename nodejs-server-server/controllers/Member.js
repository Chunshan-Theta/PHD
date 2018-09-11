'use strict';

var utils = require('../utils/writer.js');
var Member = require('../service/MemberService');

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

module.exports.memberGET = function memberGET (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  var name = req.swagger.params['name'].value;
  var group = req.swagger.params['group'].value;
  var permission = req.swagger.params['permission'].value;
  Member.memberGET(mid,name,group,permission)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
