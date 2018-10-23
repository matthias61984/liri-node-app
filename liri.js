// Required magic beans
  require("dotenv").config();
  var request = require('request');
  var moment = require('moment');
  var fs = require('fs');

// Required spotify magic
  var keys = require("./keys.js");
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  
// Store command input to decide which function to call
  var command = process.argv[2];
// Slice off remaining indices in command line, join together as input for searches
  var input = process.argv.slice(3).join(" ");

// Spotify command!
  var spotifyIt = function(input) {
  // Call spotify API, passing in the input to their fancy track search
    spotify.search({ type: 'track', query: input }, function(err, data) {
    // If stuff gets screwy...
      if (err) {
      // ...tell us what's screwy
        return console.log('Error occurred: ' + err);
      }
    // Console log all the cool stuff about the song
      console.log("Name of artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Name of song: " + data.tracks.items[0].name);
      console.log("Preview the song at " + data.tracks.items[0].preview_url) 
      console.log("Name of album: " + data.tracks.items[0].album.name)
    });
  }

// Concert command!
  var concertIt = function(input) {
  // Call the bands in town api, inserting the input as the search parameter
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function(error, response, body) {
    // If we get no error...
      if (!error && response.statusCode === 200) {
      // ...for the first ten shows, log the desired information to the terminal
        for (i=0; i <= 9; i++) {
          console.log(input + " will be playing at " + JSON.parse(body)[i].venue.name + " in " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region + " on " + moment(JSON.parse(body)[i].datetime).format('ll') + ".");
        }
      }
    });
  }

// OMDb command!
  var omdbIt = function(input) {
  // Call the omdb api, inserting the input as the search parameter
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    // If we get no error...
      if (!error && response.statusCode === 200) {
      // ...log the desired information to the terminal
        console.log("Movie title: " + JSON.parse(body).Title);
        console.log("Release date: " + JSON.parse(body).Year);
        console.log("Imdb rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Year: " + JSON.parse(body).Country);
        console.log("Languages: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  }

// Do what it says command
  var doWhatItSays = function() {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      var dataSplit = data.split(",", 2);
      randomCommand = dataSplit[0];
      randomInput = dataSplit[1];
      console.log(randomCommand);
      console.log(randomInput);
    });
  }

// Depending on the command provided in argv, call appropriate function and pass it input as an argument
  if (command == "spotify-this-song") {
    spotifyIt(input);
  } else if (command == "concert-this") {
    concertIt(input);
  } else if (command == "movie-this") {
    omdbIt(input);
  } else if (command == "do-what-it-says") {
    doWhatItSays();
  } else {
  // Instruct user to enter appropriate command
    console.log("Please provide a valid command as argv[2], and your search input separated by spaces afterwards.");
  }