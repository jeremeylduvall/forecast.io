// Pull the request together
var geonames = require("./geonames.js");

// Cycle over arguments. Ignore the first two and run everything else through Geonames GET request
for(var i=2; i<process.argv.length; i++) {
	geonames.get(process.argv[i]) 
};