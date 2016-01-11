
function Robot() {

	var response;

	this.respond = function( inputString ) {
		
		var stringLowerCased = inputString.toLowerCase();

		for (var key in cases) {
	        if (stringLowerCased.indexOf(key) >= 0) {
	            response = cases[key];
	            return;
	        } else {
				var ran = Math.floor( (Math.random() * ( cases.randRes.length + 1 ) ) );
				if (ran < cases.randRes.length) {
					response = cases.randRes[ran];
				} else {
					response = inputString;
				}
	      	}
	    }
	};

	this.getResponse = function() {
		return response;
	};
}

