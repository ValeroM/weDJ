module.exports = {
  songs: require("./songs")
};

// since we imported controller directory under the routes directory, node is gonna look for index.js first so we want to let it know that songs will be a file under controllers
