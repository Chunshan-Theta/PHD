'use strict';


/**
 * delete a member.
 * 
 *
 * mid String 
 * no response value expected for this operation
 **/
exports.memberDELETE = function(mid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * return the members who meet to the filter.
 * 
 *
 * mid String allowed f : =,>,<,LIKE (optional)
 * name String allowed f : =,>,<,LIKE (optional)
 * group String allowed f : =,>,<,LIKE (optional)
 * permission String  (optional)
 * returns List
 **/
exports.memberGET = function(mid,name,group,permission) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * new a member.
 * 
 *
 * member Member 
 * no response value expected for this operation
 **/
exports.memberPOST = function(member) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * update the member's data.
 * 
 *
 * member Member 
 * no response value expected for this operation
 **/
exports.memberPUT = function(member) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

