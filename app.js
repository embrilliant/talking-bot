$(function() {

    function chat() {
        var robot = new Robot();

        robot.respond( $("input").val() );

        $("#resultMsg").text( robot.getResponse() );

        var msg = new SpeechSynthesisUtterance( robot.getResponse() );
        window.speechSynthesis.speak(msg);
    }

    $("#click").on("click", function(e) {
        e.preventDefault();
        chat();
        $("input").val("");
    });

    function speech() {
        if ("webkitSpeechRecognition" in window) {
            var recognition = new webkitSpeechRecognition();
            var final_transcript;
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.lang = "en-US"; 
            // recognition.maxAlternatives = 1;

            recognition.onstart = function( event ) {
                $("#session").text("Chat session started");
                $("#session").attr("class", "sessStatus started");
                console.log( "recognition started." );
            };

            recognition.onend = function() {
                console.log("recognition ended.");
                $("#session").text("Chat session ended");
                $("#session").attr("class", "sessStatus ended");
                // document.getElementById("session").className = "ended";
                $("#sessWrap p").text("");
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
                $("input").val( final_transcript );
                chat();
            };

            recognition.start();

        } else {
            console.log("Your browser doesn't support speech recognition.");
        }
    }
    speech();
});