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

        // Create boolean variable for later
        isLobbyFound = false;

        // Look for code in table
        Lobby
            .findByPk(lobby_code)
            .then(isLobbyFound = true)
            .catch(res.status(404));

        if (isLobbyFound)
        {
            // Set pase JSON body as value to lobby_id_value
            lobby_id_found = lobby_code;

            // Send back response
            res.status(200);
        }
    };

    return [logEndPoint, getLobbyPk, getLobbiesFromDb]; // performs the methods we declared
};

module.exports = setup;
