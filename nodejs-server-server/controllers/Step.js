'use strict';

var utils = require('../utils/writer.js');
var Step = require('../service/StepService');

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

module.exports.stepGET = function stepGET (req, res, next) {
  var sid = req.swagger.params['sid'].value;
  var title = req.swagger.params['title'].value;
  var group = req.swagger.params['group'].value;
  var submid = req.swagger.params['submid'].value;
  var adminmid = req.swagger.params['adminmid'].value;
  Step.stepGET(sid,title,group,submid,adminmid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
