function setup() {
  return {
    songsOnQueue: require("./songs")(),
    addSongsToQueue: require("./postsongs")()
  };
}

module.exports = setup;
