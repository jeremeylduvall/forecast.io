# Forecast.io Project with Node.js

Using Node.js, this program accepts a zip code argument from the command line. Then, it does the following:

1. Uses a GET request to the Geonames.org API 
2. Returns the latitude and longitude for the postal code provided
3. Uses a second GET request to the Forecast.io API
4. Returns the forecast summary for the given latitude and longitude
5. Logs out the forecast to the command line

After downloading the project files and installing Node.js, you can run the program like this:

```node request.js 33811```

The program accepts an unlimited number of zip codes so you could run:

```node request.js 33811 33803, 80005, 80301```

This project was suggested in the [Treehouse Fullstack JavaScript course](https://teamtreehouse.com/tracks/fullstack-javascript).
