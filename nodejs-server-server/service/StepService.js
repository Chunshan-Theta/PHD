'use strict';


/**
 * delete a step.
 * 
 *
 * sid String 
 * no response value expected for this operation
 **/
exports.stepDELETE = function(sid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * return the members who meet to the filter.
 * 
 *
 * sid String allowed f : =,>,<,LIKE (optional)
 * title String allowed f : =,>,<,LIKE (optional)
 * group String allowed f : =,>,<,LIKE (optional)
 * submid String allowed f : =,>,<,LIKE (optional)
 * adminmid String allowed f : =,>,<,LIKE (optional)
 * returns List
 **/
exports.stepGET = function(sid,title,group,submid,adminmid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * new a step to the submember.
 * 
 *
 * member Step 
 * no response value expected for this operation
 **/
exports.stepPOST = function(member) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * update the member's a step.
 * 
 *
 * step Step 
 * no response value expected for this operation
 **/
exports.stepPUT = function(step) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

