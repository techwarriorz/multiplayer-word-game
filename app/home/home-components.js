var Chat = React.createClass({
  getInitialState: function(){
    return {
      socket: io()
    }
  },
  render: function(){
    return(<h1>Hello World</h1>)
  }
});

ReactDOM.render(<Chat/>, document.getElementById('chat'));