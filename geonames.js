// Require http and forecastio.js file
var http = require("http");
var forecast = require("./forecastio.js");

// Setup a function to print the error message
function printError(error) {
	console.error(error.message);
};

// Create get function that connects to API and returns data
function get(zipCode) {
	// Connect to Geonames API
	var request = http.get("http://api.geonames.org/postalCodeSearchJSON?postalcode=" + zipCode + "&maxRows=1&username=jeremey", function (response){
		var body = "";
		// Read the data
		response.on('data', function (chunk) {
			// Add the data to a chunk
			body += chunk;
		});
		
		// Tell the function what to do on end
		response.on('end', function() {
			if(response.statusCode == 200) {
				// Parse the data
				try {
					// Set the variable zipInfo to the JSON data
					var zipInfo = JSON.parse(body);
					if (zipInfo.postalCodes[0] === undefined) {
						printError({message: "There was an error getting info for " + zipCode +"."})
					} else {
						// Assign variables for zipCode, latitude, and longitude
						// Using index of 0 because I only want the first option for a given postal code
						zipCode = zipInfo.postalCodes[0].postalCode;
						latitude = zipInfo.postalCodes[0].lat;
						longitude = zipInfo.postalCodes[0].lng;
						// Get the forecast for the latitude and longitude
						forecast.get(latitude,longitude,zipCode);
					}
				} catch(error) {
					// Parse error
					printError(error);
				}
			} else {
				// Status code error
				printError({message: "There was an error getting info for " + zipCode +"."})
			}
		});
	});
	request.on('error', printError);
}

module.exports.get = get;