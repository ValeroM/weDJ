function setup() 
{
  return {
    // "()" is needed because we are calling a function
    songsOnQueue: require("./songs")(),
    addSongsToQueue: require("./postsongs")(),
    songRating: require("./rating")()
  };
}

module.exports = setup;

// when we import the songs directory, node looks for index.js first (this one), so back under routes/get-songs we are calling the specified controllers
