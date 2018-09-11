'use strict';

var utils = require('../utils/writer.js');
var Business = require('../service/BusinessService');

module.exports.newsubmemberPOST = function newsubmemberPOST (req, res, next) {
  Business.newsubmemberPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.submembersGET = function submembersGET (req, res, next) {
  var mid = req.swagger.params['mid'].value;
  Business.submembersGET(mid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.submemberswithexcelGET = function submemberswithexcelGET (req, res, next) {
  Business.submemberswithexcelGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
