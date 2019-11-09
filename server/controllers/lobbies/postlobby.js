const db = require("../../database/models");
const { Lobby } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/lobbies endpoint");
    next();
  };

  const addLobby = (req, res) => {
    // expect name of lobby
    const new_lobby = req.body;
    // using sequelize, we create a new record for our table "lobbies" with new_lobby
    Lobby.create(new_lobby)
      .then((lobby) => {
        res.status(200).json(lobby);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  return [logEndPoint, addLobby]; // performs the methods we declared
};

module.exports = setup;
