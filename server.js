var express = require('express'),
    app     = express(),
    http    = require('http'),
    socketIO      = require('socket.io'),
    mongoose      = require('mongoose');
    //http.listen(process.env.PORT || 5000);

const PORT = process.env.PORT || 3000;
const INDEX = __dirname + '/index.html';
var server = http.createServer(app);
const io = socketIO.listen(server);
server.listen(PORT);
mongoose.connect(process.env.MONGOLINK);

var userController = require('./server/controllers/user-controller.js');

io.on('connection', (socket)=> {
  console.log("Client Connected");
  socket.on('disconnect', () => console.log("Client Disconnected"));
  socket.on('message', (message)=> io.emit('receive-message', message));
});

app.use('/app', express.static(__dirname + '/app'));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

//User Create
app.post('/signup', userController.signup);








