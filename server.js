var express = require('express'),
    app     = express(),
    http    = require('http').Server(app),
    io      = require('socket.io')(http);
    http.listen(8080, "127.0.0.1");

app.use('/app', express.static(__dirname + '/app'));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.listen('3000', function(){
  console.log("this is running");
});