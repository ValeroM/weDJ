const db = require("../../database/models");
const { Song } = db;

const setup = () => {

    const song_id_found;

    const logEndPoint = (req, res, next) => {
        console.log("You have hit the [GET] api/songs/songPk endpoint");
        next();
    };

    const findSongPk = (req, res) => {
        // OBJECTIVE: Find primary key from Song table based on song_code

        // Parse JSON body to only get song_code
        const song_id = req.body.song_code;

        // Create boolean variable for later
        isSongFound = false;
        
        // After parsing, find song's primary key from table
        Song
            .findByPk(song_id)
            .then(isSongFound = true)
            .catch(res.status(404));

        if (isSongFound) 
        {
            // Set parse body as value to song_id_found
            song_id_found = song_id;

            // Return response
            res.status(200);
        }
    };

    return [logEndPoint, findSongPk]; // performs the methods we declared
};

module.exports = setup;
