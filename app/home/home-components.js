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
    return(<div><ul>{messages}</ul>
      <input type="text" id="message"/> <button onClick={this.sendMessage}/>
    </div>)
  }
});

ReactDOM.render(<Chat/>, document.getElementById('chat'));