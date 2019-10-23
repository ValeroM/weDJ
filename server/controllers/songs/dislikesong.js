const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/songs/:id/dislike endpoint");
    next();
  };

  const updateSongDislike = (req, res) => {
    const { id } = req.params;
    Song.findByPk(id).then((song) => {
      if (!song) {
        return res.sendStatus(400);
      }
      song
        .increment("dislikes", { by: 1 })
        .then((updatedSong) => {
          // either I send back the updated song as json or the .send message. It can't be both.
          res.status(200).json(updatedSong);
          // .send("You've updated the song amount of dislikes!")
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  };

  return [logEndPoint, updateSongDislike]; // performs the methods we declared
};

module.exports = setup;
