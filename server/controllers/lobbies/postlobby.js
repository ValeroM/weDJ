const db = require("../../database/models");
const cryptoRandomString = require('crypto-random-string');
const { Lobby } = db;

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/lobbies/:name endpoint");
    next();
  };

  const codeForLobby = cryptoRandomString({ length: 6, type: 'base64' });

  const addLobby = (req, res) => {
    const new_lobby = {
      name: req.params.name, // get the name from the params sent by the frontend
      lobby_code: codeForLobby
    }
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
