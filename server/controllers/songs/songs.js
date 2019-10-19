const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [GET] /songs endpoint");
    next();
  };

  const sendSongs = (req, res, next) => {
    Song.findAll().then((songs) => res.status(200).json(songs));
  };

  return [logEndPoint, sendSongs]; // performs the methods we declared
};

module.exports = setup;

/*
const mockSongsData = require("../../mockDataSongs"); // this file will simulate an intity and its properties -- the stuff we will actually use whenever we have a db

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [GET] /songs endpoint");
    next();
  };

  const sendResponse = (req, res, next) => {
    console.log("Sending back some songs now");
    let songs = [];
    mockSongsData.forEach((element) => {
      songs.push(element.songName);
      // console logging for us to make sure its working
      console.log(
        "id of song: " +
          element.songID +
          " amount of likes: " +
          element.likes +
          "amount of dislikes: " +
          element.dislikes
      );
    });
    res.status(200).json(songs);
  };

  return [logEndPoint, sendResponse]; // performs the methods we declared
};

module.exports = setup;
*/
