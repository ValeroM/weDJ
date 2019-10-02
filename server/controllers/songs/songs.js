const mockSongsData = require("../../mockDataSongs"); // this file will simulate an intity and its properties -- the stuff we will actually use whenever we have a db

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [GET] /songs endpoint");
    next();
  };

  const sendResponse = (req, res, next) => {
    console.log("Sending back some songs now");
    let songs = [];
    mockSongsData.forEach(element => {
      songs.push(element.songName);
    });
    res.status(200).json(songs);
  };

  return [logEndPoint, sendResponse]; // performs the methods we declared
};

module.exports = setup;