var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res) {
    res.render('index',{});
});

/*
router.get('/EntranceForChat', function(req, res) {
    res.render('EntranceForChat',{});
});


router.post('/Chat', function(req, res) {
    var user = req.param('user', null);
    var ID = req.param('create', null);
    var ip = req.connection.remoteAddress.substring(7);
    console.log('ip:'+ip);

    if(ID==null){
       ID = req.param('add', null);
       console.log('"'+ip+'" '+'add chat: '+ID);
    }
    else{
       ID = ID+'-'+ip;
       console.log('"'+ip+'" '+'Create chat: '+ID);
    }

    if(user==null){
       user = "anonymous"+' ~ xxxx.xxx...'+ip.substring(7);
       console.log('"'+ip+'" '+'Set anonymous UserName: '+user) ;
    }
    else{
       user=user+' ~ '+ip;
       console.log('"'+ip+'" '+'Set UserName: '+user);
    }

    res.render('ChatroomPage',{title:'聊天室代號：',room:ID,UserName:user});
});






router.get('/argument', function(req, res) {

    var controller_of_argument = require('./Controller/argument.js');
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
*/


module.exports = router;
