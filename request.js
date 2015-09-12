// Pull the request together
var geonames = require("./geonames.js");

for(var i=2; i<process.argv.length; i++) {
	geonames.get(process.argv[i]) 
};