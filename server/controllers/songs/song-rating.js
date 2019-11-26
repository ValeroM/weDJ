const db = require("../../database/models");
const { Song, Queue, Lobby } = db;

const setup = () => {

    const logEndPoint = (req, res, next) => {
        console.log("You have hit the [GET] api/songs/rate endpoint");
        next();
    };

    const compositeKeyObj = {
        lobbyId: null,
        songId: null
    };

    const findSongByPk = (req, res, next) => {

        // Parse JSON body
        const song_id = req.body.song_code;
        
        // Find "song_id" in Song table
        Song
            .findOne({where: {song_code: song_id}})
            .then(isSongFound => {

                // Check if song was found
                if (!isSongFound)
                {
                    // Send back JSON message
                    res.status(400);
                }

                // Execute code below, if song was found

                // Get song's primary key
                compositeKeyObj.songId = isSongFound.get("id");
                next();
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }

    const findLobbyByPk = (req, res, next) => {

        // Parse JSON boddy
        const lobby_id = req.body.lobby_code;

        // Look for lobby_id in Lobby table
        Lobby
            .findOne({where: {lobby_code: lobby_id}})
            .then(isLobbyFound => {

                // Return error 400, if lobby wasn't found
                if (!isLobbyFound)
                {
                    res.status(400);
                }

                // Get lobby's primary key, if found
                compositeKeyObj.lobbyId = isLobbyFound.get("id");
                next();
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    }

    const changeSongRating = (req, res, next) => {
        
        // OBJECTIVE: Go to Queue's lobby and fetch row with lobby's and song's id

        // Parse JSON body
        const incoming_rate = req.body.rate;
        Queue
            .findAll({where: {
                lobbyId: compositeKeyObj.lobbyId,
                songId: compositeKeyObj.songId
            }})
            .then((isSongAndLobbyFound) => {

                // If correct data is found, increment/decrement song's rating
                if (incoming_rate == 1)
                    isSongAndLobbyFound.increment("rate", {by: 1});
                else
                    isSongAndLobbyFound.decrement("rate", {by: 1});

                // Return JSON response
                res.status(200).json(isSongAndLobbyFound);
            })
            .catch((err) => {res.status(200).json(err);})
    }

    /*
    // Return all songs in our songs table
    const sendBackSongsCodes = (req, res, next) => {
        Song.findAll().then((songs) => res.status(200).json(songs));
    };
    */

    return [logEndPoint, findSongByPk, findLobbyByPk, changeSongRating]; // performs the methods we declared
};

module.exports = setup;
