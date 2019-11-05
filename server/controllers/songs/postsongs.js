const db = require("../../database/models");
const { Song } = db;


const setup = () => {
  
  const logEndPoint = (req, res, next) => 
  {
    console.log("You have hit the [POST] api/songs endpoint");
    next();
  };

  // Add song
  const addSong = (req, res) => 
  {
    // Expects a parameter of song's name
    const new_song = req.body;

    // From the database, create a new element with new_song
    Song
      .create(new_song)
      .then((song) => {
        res.status(200).json(song); // After adding song, send OK message
      })
      .catch((err) => {
        res.status(400).json(err); // If cannot add song, send ERROR message
      });
  };

  return [logEndPoint, addSong]; // performs the methods we declared
};

module.exports = setup;
