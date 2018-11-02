
var request = require('request');

module.exports.getsubmember = function (mid,CallbackFunc){
      console.log(mid);
      request.get('http://localhost:3080/PHD/submembers?mid='+mid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body) // 打印google首页

          submembers = JSON.stringify(JSON.parse(body)).replace(/\\"/g,"'");
          //console.log(submembers);
          CallbackFunc(submembers);

        }
        else {
          console.log(error);
          CallbackFunc('error');
        }
      })

}
module.exports.getyours = function (mid,CallbackFunc){
      console.log(mid);

      request.get('http://localhost:3080/PHD/submember?mid='+mid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // 打印google首页

          submembers = JSON.stringify(JSON.parse(body)).replace(/\\"/g,"'");
          console.log(submembers);
          CallbackFunc(submembers);

        }
        else {
          console.log(error);
          CallbackFunc('error');
        }
      })

}


module.exports.login = function (account,pws,CallbackFunc){



      request.get('http://localhost:3080/PHD/logintest?account='+account+'&pws='+pws, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // 打印google首页

          submembers = JSON.parse(body);
          CallbackFunc(1,submembers[0]);

        }
        else {
          console.log(body);

          CallbackFunc(0,JSON.parse(body)['content']);
        }
      })

}

module.exports.newsubmember = function (account,pws,name,entertime,teacher,group,CallbackFunc){

    var description={};
    description['入學年'] = entertime;
    description['指導教授']=teacher;
    console.log(account,pws,name,JSON.stringify(description),group);

    request.post("http://localhost:3080/PHD/member",function(error,response,body){
      body = JSON.parse(body);
      if(body['errno']){
        console.log(body);
        CallbackFunc(0,body['sqlMessage']);
      }else {
        console.log(body);
        CallbackFunc(1,body['insertId']);
      }

    }).form({
        "account":account,
        "pws":pws,
        "name":name,
        "group":group,
        "description":JSON.stringify(description),
        "permission":"user",
        "hidden":false,
        "alert":true,
        "mid":"NULL"
      });
}



module.exports.NewStep = function (step,CallbackFunc){
    console.log(step);
    //step = JSON.stringify(step);
    //console.log(step);
    request.post("http://localhost:3080/PHD/step",function(error,response,body){

      CallbackFunc(body);

    }).form({
      "group":step['group'],
      "submid":step['submid'],
      "title":step['title'],
      "description":step['description'],
      "log":step['log'],
      "status":step['status'],
      "deadline":step['deadline'],
      "sid":"NULL",
      "adminmid":"NULL"
    });
  }
module.exports.editStep = function (step,CallbackFunc){
      console.log(step);
      //step = JSON.stringify(step);
      //console.log(step);

      request.put("http://localhost:3080/PHD/step",function(error,response,body){

        CallbackFunc(body);

      }).form({
        "group":"NULL",
        "submid":"NULL",
        "title":step['title'],
        "description":step['description'],
        "log":step['log'],
        "status":step['status'],
        "deadline":step['deadline'],
        "sid":step['sid'],
        "adminmid":"NULL"
      });
    }

module.exports.editSubMember = function (memberName,memberId,memberDescription,CallbackFunc){
  console.log(memberName,memberId,memberDescription);
  //step = JSON.stringify(step);
  //console.log(step);

  request.put("http://localhost:3080/PHD/member",function(error,response,body){

    CallbackFunc(body);

  }).form({
  "hidden": false,
  "alert": true,
  "name": memberName,
  "mid": memberId,
  "description": JSON.stringify(memberDescription),
  "permission": "user",
  "pws": "NULL",
  "account": "NULL",
  "group": "NULL"
});
}
module.exports.deleteStep = function (sid,CallbackFunc){

    var link = "http://localhost:3080/PHD/step?sid="+sid;
    console.log(link);
    request.delete(link,function(error,response,body){

      CallbackFunc(body);

    });
}

module.exports.deleteSubMember = function (memberId,CallbackFunc){

  var link = "http://localhost:3080/PHD/member?mid="+memberId;
  console.log(link);
  request.delete(link,function(error,response,body){

    CallbackFunc(body);

  });
}
