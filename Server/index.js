const express = require("express");
var http = require('http').createServer(express);
var io = require('socket.io')(http);
const port = 3000;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect',()=>{
    console.log('User Disconnected');
  })


  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log('listening on :',port);
});