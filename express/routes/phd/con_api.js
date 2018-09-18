
var request = require('request');
module.exports.getsubmember = function (mid,CallbackFunc){
      console.log(mid);
      request('http://localhost:3080/PHD/submembers?mid=3', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body) // 打印google首页
          CallbackFunc(JSON.parse(body));
        }
      })

}
