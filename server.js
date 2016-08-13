var express = require('express'),
    app     = express(),
    //http    = require('http').Server(app),
    socketIO      = require('socket.io');
    //http.listen(process.env.PORT || 5000);

const PORT = process.env.PORT || 3000;
const INDEX = __dirname + '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);


io.on('connection', (socket)=> {
  console.log("Client Connected");
  socket.on('disconnect', () => console.log("Client Disconnected"));
});



server.use('/app', express.static(__dirname + '/app'));
server.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

