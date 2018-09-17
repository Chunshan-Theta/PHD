var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/review', function(req, res) {
    var user = req.param('user', null);
    var controller_of_argument = require('./phd/argument.js');
    c = new controller_of_argument();


    c.controller(function(QuestionDoc,ActionDoc){

        console.log(QuestionDoc);
        console.log(ActionDoc);
        var user = '123'//req.param('user', null);
        var ID = '123'//req.param('create', null);
        var ip =  req.connection.remoteAddress.substring(7);
        console.log('ip:'+ip);
        console.log('"'+ip+'" '+'Create chat: '+ID);

        res.render('argument/ChatroomPage',{title:'聊天室代號：',room:ID,UserName:user});
    });


});
module.exports = router;
