const db = require("../../database/models");
const { Song, Queue, Lobby } = db;

const setup = () => {

    const song_id_found;

    const logEndPoint = (req, res, next) => {
        console.log("You have hit the [GET] api/songs/rate endpoint");
        next();
    };

    const findSongPk = (req, res) =>
    {
        // OBJECTIVE: Find primary key from Song table based on song_code

        // Parse JSON body to only get song_code
        const song_id = req.body.song_code;

        // Create boolean variable for later
        isSongFound = false;
        // After parsing, find song's primary key from table
        Song
            .findByPk(song_id)
            .then(isSongFound = true)//song_id_found = song_id)  // If found, store primary key in song_id_found
            .catch(res.status(404));

        if (isSongFound)
        {
            // Set parse body as value to song_id_found
            song_id_found = song_id;

            // Return response
            res.status(200);
        }

    // Is this needed?
    // Return all songs in our songs table
    // const sendBackSongsCodes = (req, res, next) => {
    //     Song.findAll().then((songs) => res.status(200).json(songs));
    };

    return [logEndPoint, findSongPk, sendBackSongsCodes]; // performs the methods we declared
};

module.exports = setup;
