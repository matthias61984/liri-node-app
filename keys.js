console.log('this is loaded');

module.exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

module.exports.omdb = {
    apiKey: process.env.OMDB_API_KEY
};