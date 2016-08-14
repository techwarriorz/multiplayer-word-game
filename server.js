var express = require('express'),
    app     = express(),
    http    = require('http'),
    socketIO      = require('socket.io'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser');
    //http.listen(process.env.PORT || 5000);

const PORT = process.env.PORT || 3000;
const INDEX = __dirname + '/index.html';
var server = http.createServer(app);
const io = socketIO.listen(server);
server.listen(PORT);
mongoose.connect(process.env.MONGOLINK);
var people = {};

var userController = require('./server/controllers/user-controller.js');

io.on('connection', (socket)=> {
  console.log("Client Connected");
  socket.on('join', (username) =>{
    people[socket.id] = username;
    console.log(username);
    io.emit('users-updated', people);
  });
  socket.on('disconnect', () => console.log("Client Disconnected"));
  socket.on('message', (message)=> io.emit('receive-message', message));
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/app', express.static(__dirname + '/app'));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

//User Create
app.post('/signup', userController.signup);








