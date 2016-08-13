var express = require('express'),
    app     = express(),
    http    = require('http'),
    socketIO      = require('socket.io');
    //http.listen(process.env.PORT || 5000);

const PORT = process.env.PORT || 3000;
const INDEX = __dirname + '/index.html';

var server = http.createServer(app);
const io = socketIO.listen(server);
server.listen(PORT);

io.on('connection', (socket)=> {
  console.log("Client Connected");
  socket.on('disconnect', () => console.log("Client Disconnected"));
});

app.use('/app', express.static(__dirname + '/app'));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});







