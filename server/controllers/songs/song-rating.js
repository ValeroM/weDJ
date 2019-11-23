const db = require("../../database/models");
const { Song, Queue, Lobby } = db;

const setup = () => {

    const song_id_found;

    const logEndPoint = (req, res, next) => {
        console.log("You have hit the [GET] api/songs/rate endpoint");
        next();
    };

    // Return all songs in our songs table
    const sendBackSongsCodes = (req, res, next) => {
        Song.findAll().then((songs) => res.status(200).json(songs));
    };

    return [logEndPoint, sendBackSongsCodes]; // performs the methods we declared
};

module.exports = setup;
