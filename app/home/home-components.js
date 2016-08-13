//Create Login
//Create Message Component
//Style Components

var Chat = React.createClass({
  getInitialState: function(){
    return {
      socket: io(),
      username: "guest",
      messages: []
    }
  },
  componentDidMount: function(){
    var self = this;
    this.state.socket.on('receive-message', function(message){
      var messages = self.state.messages;
          messages.push(message);
      self.setState({messages: messages});
    })
  },
  login: function(){
    var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/signup");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function(){
          if (xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
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
  },
  render: function(){
    var messages = this.state.messages.map(function(message){
      return (<li><strong>{message.username}: </strong> <span>{message.message}</span></li>)
    });
    return(<div>
      <input type="text" id="username"/> <input type="password" id="password"/> <button onClick={this.login}> Login </button> <br/>
      <ul>{messages}</ul>
      <input type="text" id="message"/> <button onClick={this.sendMessage}/>
    </div>)
  }
});

ReactDOM.render(<Chat/>, document.getElementById('chat'));