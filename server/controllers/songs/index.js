function setup() {
  return {
    songsOnQueue: require("./songs")(),
    addSongsToQueue: require("./postsongs")() // this "()" is needed because under the files songs.js and postsongs.js we have a method so its like we are calling a function
  };
}

module.exports = setup;

// when we import the songs directory, node looks for index.js first (this one), so back under routes/get-songs we are calling the specified controllers
