'use strict';




/**
 *
 *
 *
 * mid String host's mid
 * returns inline_response_200
 **/
exports.submembersGET = function(mid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "members" : [ {
    "hidden" : true,
    "alert" : true,
    "name" : "name",
    "mid" : "mid",
    "description" : "description",
    "permission" : "permission",
    "pws" : "pws",
    "steps" : [ {
      "log" : "log",
      "description" : "description",
      "title" : "title",
      "deadline" : "deadline",
      "sid" : "sid",
      "group" : "group",
      "status" : true
    }, {
      "log" : "log",
      "description" : "description",
      "title" : "title",
      "deadline" : "deadline",
      "sid" : "sid",
      "group" : "group",
      "status" : true
    } ],
    "account" : "account",
    "group" : "group"
  }, {
    "hidden" : true,
    "alert" : true,
    "name" : "name",
    "mid" : "mid",
    "description" : "description",
    "permission" : "permission",
    "pws" : "pws",
    "steps" : [ {
      "log" : "log",
      "description" : "description",
      "title" : "title",
      "deadline" : "deadline",
      "sid" : "sid",
      "group" : "group",
      "status" : true
    }, {
      "log" : "log",
      "description" : "description",
      "title" : "title",
      "deadline" : "deadline",
      "sid" : "sid",
      "group" : "group",
      "status" : true
    } ],
    "account" : "account",
    "group" : "group"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
