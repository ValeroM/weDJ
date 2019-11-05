const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  
  // Print message when user reaches: .com/songs
  const logEndPoint = (req, res, next) => 
  {
    console.log("You have hit the [GET] api/songs endpoint");
    next();
  };

  // Return all songs in queue
  const sendBackSongs = (req, res, next) => 
  {
    Song.findAll().then((songs) => res.status(200).json(songs));
  };

  return [logEndPoint, sendBackSongs]; // performs the methods we declared
};

module.exports = setup;
