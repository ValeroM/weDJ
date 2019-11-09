const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/songs endpoint");
    next();
  };

  // Add song
  const addSong = (req, res) => {
    // expects name, artist and url
    const new_song = req.body;
    // using sequelize, we create a new record for our table "songs" with new_song
    Song.create(new_song)
      .then((song) => {
        res.status(200).json(song); // After adding song, send OK message and return the song
      })
      .catch((err) => {
        res.status(400).json(err); // If cannot add song, send ERROR message
      });
  };

  return [logEndPoint, addSong]; // performs the methods we declared
};

module.exports = setup;
