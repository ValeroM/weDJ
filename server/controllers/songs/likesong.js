const db = require("../../database/models");
const { Song } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/songs/:id/like endpoint");
    next();
  };

  const updateSongLike = (req, res) => {
    const { id } = req.params;
    Song.findByPk(id).then((song) => {
      if (!song) {
        return res.sendStatus(400);
      }
      song
        .increment("likes", { by: 1 })
        .then((updatedSong) => {
          // either I send back the updated song as json or the .send message. It can't be both.
          res.status(200).json(updatedSong);
          // .send("You've updated the song amount of likes!")
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  };

  return [logEndPoint, updateSongLike]; // performs the methods we declared
};

module.exports = setup;
