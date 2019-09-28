module.exports = {
  songs: require("./songs")
};

// since we imported controller under routes dir, node is gonna look for index.js first so we want to let it know that songs will be a file under controllers
