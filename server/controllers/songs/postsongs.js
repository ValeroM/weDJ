const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/songs endpoint");
    next();
  };

  // Add song code
  const addSongCode = (req, res) => {
<<<<<<< HEAD
    const new_song = req.body; // only expects the code for the song. The one YT api gives us

    /* OBJECTIVE:
    Add function that checks if new_song's URL is already in database
    If so, prevent song from being added
    */

=======
    const new_song = req.body; // only expects the code for the song (The one YT api gives us) and the name of the song. 
>>>>>>> 7958664f795c63487afe77f736dd8720d202dfed
    Song.create(new_song)
      .then((song) => {
        res.status(200).json(song); // After adding song, send OK message and return the song
      })
      .catch((err) => {
        res.status(400).json(err); // If cannot add song, send ERROR message
      });
  };

  return [logEndPoint, addSongCode]; // performs the methods we declared
};

module.exports = setup;
