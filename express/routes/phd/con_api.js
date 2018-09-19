
var request = require('request');
module.exports.getsubmember = function (mid,CallbackFunc){
      console.log(mid);


      request('http://localhost:3080/PHD/submembers?mid='+mid, function (error, response, body) {
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

      request('http://localhost:3080/PHD/submember?mid='+mid, function (error, response, body) {
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



      request('http://localhost:3080/PHD/logintest?account='+account+'&pws='+pws, function (error, response, body) {
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
