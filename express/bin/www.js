#!/usr/bin/nodejs
var debug = require('debug')('my-application');
var app = require('../app');

//var host ="localhost";
//var port ="3030";



//app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'),app.get('host'), function() {
  console.log('Express server listening on port ' + server.address().port+','+server.address().address);
});


var io = require('socket.io')(server);


io.on('connection', function(socket){
    socket.on('Push_message', function(msg,roomID){
        console.log('In roomID:'+roomID)
        console.log(msg)
        io.emit(roomID+'_upload_message', msg);
    });

});

module.exports = app;
