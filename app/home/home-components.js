//Create Login
//Create Message Component
//Style Components

var Chat = React.createClass({
  getInitialState: function(){
    return {
      socket: io(),
      username: localStorage.getItem('username') || "guest",
      messages: []
    }
  },
  componentDidMount: function(){
    var self = this;
    this.state.socket.on('receive-message', function(message){
      var messages = self.state.messages;
          messages.push(message);
      self.setState({messages: messages});
    });

    this.state.socket.on('update-users', function(users){
      console.log(users);
    });

    if (this.state.username !== "guest"){
      var username = JSON.parse(this.state.username);
      this.setState({username: username});
      this.state.socket.emit('join', username);
    }
  },
  login: function(){
    var self = this;
    var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/signup");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function(){
          if (xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
            self.setState({username: document.getElementById('username').value});
            localStorage.setItem('username', JSON.stringify(document.getElementById('username').value));
          }
        };
        xhttp.send(JSON.stringify({
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        }));
  },
  sendMessage: function(){
    var self = this;
    var message = {
       username: self.state.username,
       message: document.getElementById('message').value
     };
    self.state.socket.emit('message', message);
    document.getElementById('message').value = "";
  },
  enterMessage: function(event){
    var self = this;
    if (event.which === 13 && document.getElementById('message').value.length > 0){
      var message = {
        username: self.state.username,
        message: document.getElementById('message').value
      };
      self.state.socket.emit('message', message);
      document.getElementById('message').value = "";
    }
  },
  render: function(){
    var messages = this.state.messages.map(function(message){
      return (<li><strong>{message.username}: </strong> <span>{message.message}</span></li>)
    });
    var userLogin;
    if (this.state.username === "guest"){
      userLogin =<div> <input type="text" id="username"/> <input type="password" id="password"/> <button onClick={this.login}> Login </button></div>;
    } else {
      userLogin = <div> <strong> You are logged in as {this.state.username} </strong> </div>
    }
    return(<div>
      {userLogin} <br/>
      <ul>{messages}</ul>
      <input type="text" id="message" onKeyDown={this.enterMessage}/> <button id="send" onClick={this.sendMessage}> Send </button>
    </div>)
  }
});

ReactDOM.render(<Chat/>, document.getElementById('chat'));