var express = require('express'),
    app     = express(),
    http    = require('http').Server(app),
    io      = require('socket.io')(http);
    //http.listen(process.env.PORT || 5000);

//app.set('port', (process.env.PORT || 5000));
app.use('/app', express.static(__dirname + '/app'));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 80, function(){
  console.log("this is running");
});