// Problem: Forecast.io only takes lattitude and longitude arguments. If we're given a zip code, we need to convert.

var http = require("http");
var forecast = require("./forecastio.js");

// function printCoordinates(zipCode, lattitude, longitude) {
// 	var coordinates = "The zip code " + zipCode + " has the coordinates of " + latitude + ", " + longitude;
// 	console.log(coordinates);
// }

// Print out error messages
function printError(error) {
	console.error(error.message);
};

function get(zipCode) {
	// Connect to Geonames API
	var request = http.get("http://api.geonames.org/postalCodeSearchJSON?postalcode=" + zipCode + "&maxRows=1&username=jeremey", function (response){
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
					// Set the variable zipInfo to the JSON data
					var zipInfo = JSON.parse(body);
					// Assign variables for zipCode, latitude, and longitude
					zipCode = zipInfo.postalCodes[0].postalCode;
					latitude = zipInfo.postalCodes[0].lat;
					longitude = zipInfo.postalCodes[0].lng;
					// Get the forecast for the latitude and longitude
					forecast.get(latitude,longitude);
				} catch(error) {
					// Parse error
					printError(error);
				}
			} else {
				// Status code error
				printError({message: "There was an error getting info for " + zipCode +". (" + http.STATUS_CODES[response.statusCode] + ")"})
			}
		});
	});
	request.on('error', printError);
}

module.exports.get = get;