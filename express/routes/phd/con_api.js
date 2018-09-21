
var request = require('request');

module.exports.getsubmember = function (mid,CallbackFunc){
      console.log(mid);
      request.get('http://localhost:3080/PHD/submembers?mid='+mid, function (error, response, body) {
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
    description['指導老師']=teacher;
    console.log(account,pws,name,JSON.stringify(description),group);
    /*
    request.post("http://localhost:3080/PHD/member",{
        "account":account,
        "pws":pws,
        "name":name,
        "group":group,
        "description":description,
        "permission":"user",
        "hidden":false,
        "alert":true,
        "mid":"NULL"
      },function(error,response,body){
        console.log(response);
        CallbackFunc('OK');
      });
      */
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
