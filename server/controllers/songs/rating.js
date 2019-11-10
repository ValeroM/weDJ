const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/songs/rating endpoint");
    next();
  };

  const updateSongLike = (req, res) => {
    /*
    req (request) asks for the data from the frontend
    res (response) sends a URL response back to the frontend
    */
    const id = req.body.id;
    const rate = req.body.rate; // last variable is from POST

    // Update song, if found
    Song.findByPk(id) // Find key by "id" and returns value as "id_value"
      .then((id_value) => {
        // Check "rate" value and update song's rating
        if (rate == 1) id_value.increment("rating", { by: 1 });
        else id_value.decrement("rating", { by: 1 });
        // Send response to frontend
        res.status(200).json(id_value);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  return [logEndPoint, updateSongLike]; // performs the methods we declared
};

module.exports = setup;
