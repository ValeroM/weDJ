const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] /songs endpoint");
    next();
  };

  const addSong = (req, res) => {
    const new_song = req.body;
    Song.create(new_song)
      .then((song) => {
        res.status(200).json(song);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  return [logEndPoint, addSong]; // performs the methods we declared
};

module.exports = setup;
