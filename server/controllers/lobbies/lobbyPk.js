const db = require("../../database/models");
const { Lobby } = db;

const setup = () => {

    const lobby_id_found;

    const logEndPoint = (req, res, next) => {
        console.log("You have hit the [GET] api/lobbies/lobbyPk endpoint");
        next();
    };

    const getLobbyPk = (req, res) => {
        // Find lobby primary key just like song-rating.js

        // Parse JSON body
        const lobby_code = req.body.lobby_code;

        // Look for code in table
        Lobby
            .findByPk(lobby_code)
            .then(lobby_id_found = lobby_code)
            .catch(console.log("Song not found"));

        // is this needed?
        // Lobby.findAll().then((lobbies) => res.status(200).json(lobbies));
    };

    return [logEndPoint, getLobbiesFromDb]; // performs the methods we declared
};

module.exports = setup;
