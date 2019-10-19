const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] /songs endpoint");
    next();
  };

  const updateSongs = (req, res) => {
    const new_song = req.body;
    Song.create(new_song)
      .then((song) => {
        res.status(200).json(song);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  return [logEndPoint, updateSongs]; // performs the methods we declared
};

module.exports = setup;

/*
const mockSongsData = require("../../mockDataSongs"); // this object will simulate an intity and its properties -- the stuff we will actually use whenever we have a db

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] /postsongs endpoint");
    next();
  };

  const updateSongs = (req, res, next) => {
    console.log("post songs: ", req.body); // the body of the request has the song to post
    const newSong = req.body;
    JSON.stringify(newSong); // converting to json so that we can add it
    mockSongsData.push(newSong);
    next();
  };

  const sendResponse = (req, res, next) => {
    console.log(
      "Sending back the following message:\n" + "You've updated the songs!"
    );
    res.status(200).send("You've updated the songs");
  };

  return [logEndPoint, updateSongs, sendResponse]; // performs the methods we declared
};

module.exports = setup;
*/
