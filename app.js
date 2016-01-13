function chat( userInput ) {

    var robot = new Robot();

    robot.respond( userInput );

    document.querySelector(".resultMsg").textContent = robot.getResponse();

    var msg = new SpeechSynthesisUtterance( robot.getResponse() );
    window.speechSynthesis.speak(msg);
}

function speech() {
    if ("webkitSpeechRecognition" in window) {
        var recognition = new webkitSpeechRecognition();
        var final_transcript;
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        var sessionStatusEl = document.querySelector(".sessStatus");

        recognition.onstart = function( event ) {
        	sessionStatusEl.textContent = "Chat session started";
            sessionStatusEl.className = "sessStatus started";
            console.log( "recognition started." );
        };

        recognition.onend = function() {
            console.log("recognition ended.");
            sessionStatusEl.textContent = "Chat session ended";
            sessionStatusEl.className = "sessStatus ended";
            document.querySelector(".sessionBox p").textContent = "";
        };

        recognition.onerror = function(event) {
            console.log("recognition error.");
        };

        recognition.onresult = function( event ) {
            final_transcript = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final_transcript = final_transcript + event.results[i][0].transcript;
              } 
            }
            document.querySelector("input").value = final_transcript;
            chat( final_transcript );
        };

        recognition.start();

    } else {
        console.log("Your browser doesn't support speech recognition.");
    }
}

var Container = React.createClass({
  render: function() {
    return (
      <div className="container">
        <SessionBox />
        <FormBox />
        <ResultMsg />
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

    handleUserTextInputChange: function(e) {
        this.setState( {userTextInput: e.target.value} );
    },

    handleSubmit: function(e) {
		e.preventDefault();
		var userTextInput = this.state.userTextInput;
		chat( userTextInput );
		this.setState( {userTextInput: ""} );
    },

	render: function() {
		return (
		  <form className="formBox" onSubmit={this.handleSubmit}>
		    <input className="textInput" type="text" name="text" onChange={this.handleUserTextInputChange}/>
		    <br />
		    <br />
		    <button type="submit" className="sendButton">
				Send 
			</button>
			[You can also press Enter or just speak]
		  </form>
		);
	}
});

var ResultMsg = React.createClass({
  render: function() {
    return (
      <p className="resultMsg">
      </p>
    );
  }
});

ReactDOM.render(
	<Container />, document.getElementById("content") 
);

speech();
