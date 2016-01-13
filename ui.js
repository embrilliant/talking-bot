var Container = React.createClass({
  render: function() {
    return (
      <div className="container">
        <SessionBox />
        <FormBox />
        <Result />
      </div>
    );
  }
});

var SessionBox = React.createClass({
  render: function() {
    return (
      <div className="sessionBox">
        <SessStatus />
        <p>(Please speak something.)</p>
      </div>
    );
  }
});

	var SessStatus = React.createClass({
	  render: function() {
	    return (
	      <span className="sessStatus pending">
	  		Chat session pending
	      </span>
	    );
	  }
	});

var FormBox = React.createClass({
	render: function() {
		return (
		  <form className="formBox">
		    <TextInput />
		    <br />
		    <br />
		    <SendButton /> [You can also press Enter or just speak]
		  </form>
		);
	}
});

	var TextInput = React.createClass({
	  render: function() {
	    return (
	    	<input className="textInput" type="text" name="text" />
	    );
	  }
	});

	var SendButton = React.createClass({

		handleClick: function
		render: function() {
			return (
				<button className="sendButton" onClick={this.handleClick}>
					Send 
				</button>
			);
		}
	});

var Result = React.createClass({
  render: function() {
    return (
      <p className="result">
        Hello, world! I am the result.
      </p>
    );
  }
});

ReactDOM.render(
  <Container />, document.getElementById("content") 
);