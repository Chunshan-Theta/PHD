#!/usr/bin/nodejs
var debug = require('debug')('my-application');
var app = require('../app');

app.set('port', process.env.PORT || 3030);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


var io = require('socket.io')(server);


io.on('connection', function(socket){
    socket.on('Push_message', function(msg,roomID){
        console.log('In roomID:'+roomID)
        console.log(msg)
        io.emit(roomID+'_upload_message', msg);
    });

});
