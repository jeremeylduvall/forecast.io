// Now that we have a lattitude and longitude, we need to run it through forecast.io

// Require the Geonames file
// var geonames = require("./geonames.js");
var https = require("https");

// Print out error messages
function printError(error) {
	console.error(error.message);
};

function get(latitude,longitude) {
	// Connect to Forecast.io API
	var request = https.get("https://api.forecast.io/forecast/585f3d6f248d7de626a49f83350e3c79/" + latitude + "," + longitude, function (response){
		var body = "";
		// Read the data
		response.on('data', function (chunk) {
			// Add the data to a chunk
			body += chunk;
		});
		
		response.on('end', function() {
			if(response.statusCode == 200) {
				// Parse the data
				try {
					var forecast = JSON.parse(body);
					// Log out the weather summary
					console.log(forecast.daily.summary);
				} catch(error) {
					// Parse error
					printError(error);
				}
			} else {
				// Status code error
				printError({message: "There was an error getting info for " + latitude +" ," + longitude + "(" + http.STATUS_CODES[response.statusCode] + ")"})
			}
		});
	});
	request.on('error', printError);
}

module.exports.get = get;