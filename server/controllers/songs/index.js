function setup() {
  return {
    // "()" is needed because we are calling a function
<<<<<<< HEAD
    songsOnQueue: require("./songs")(),
    addSongsToQueue: require("./postsongs")(),
    addSongRating: require("./song-rating")()
=======
    songsOnTableSongs: require("./songs")(),
    addSongsToTableSongs: require("./postsongs")(),
    addSongsToQueue: require("./posttoqueue")()
>>>>>>> 7958664f795c63487afe77f736dd8720d202dfed
  };
}

module.exports = setup;

// when we import the songs directory, node looks for index.js first (this one), so back under routes/get-songs we are calling the specified controllers
