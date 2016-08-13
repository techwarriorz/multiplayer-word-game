var Chat = React.createClass({
  getInitialState: function(){
    return {
      socket: io('https://multiplayer-word-game.herokuapp.com/')
    }
  },
  render: function(){
    return(<h1>Hello World</h1>)
  }
});

ReactDOM.render(<Chat/>, document.getElementById('chat'));