var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){

   socket.on('chat message',function(message){
       io.emit('chat message',message);
   });

   socket.on('disconnect',function(){
     console.log('some user left');
     socket.broadcast.emit('chat message','some user left the chat room');
   });
   
});

http.listen(2000,function(){
  console.log('Our application is succesfully running on port 2000.');
});