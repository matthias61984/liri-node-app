// Required magic beans
  require("dotenv").config();
  var request = require('request');

// Required spotify magic
  var keys = require("./keys.js")
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
// Required omdb magic
  var omdbApi = require('omdb');
//  var omdb = new omdbApi(keys.omdb);
  

// Store command input to decide which function to call
  var command = process.argv[2];
// Slice off remaining indices in command line input, join together as input 
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
    
  }

// OMDb command!
  var omdbIt = function(input) {
    omdb.get(params, function(err, data) {
       // If stuff gets screwy...
       if (err) {
        // ...tell us what's screwy
          return console.log('Error occurred: ' + err);
        }
      // Console log all the cool stuff about the movie
        console.log("Name of movie: " + data.title);
    });
  };
  

// Depending on the command provided in argv, call appropriate function and pass it input as an argument
  if (command == "spotify-this-song") {
    spotifyIt(input);
  } else if (command == "concert-this") {
    concertIt(input);
  } else if (command == "movie-this"); {
    omdbIt(input);
  }