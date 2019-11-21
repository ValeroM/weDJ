const db = require("../../database/models");
const { Song, Lobby, Queue } = db;

const setup = () => {

  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] api/songs/add endpoint");
    next();
  };

  const compositeKeyObj = {
    lobbyId: null,
    songId: null
  };

  const checkIfSongExistAlready = (req, res, next) => {
    const { song_code, name } = req.body
    Song.findOne({
      where: { song_code: song_code }
    })
      .then(song => {
        if (!song) {  // if not in our songs table already, we have to add it. 
          const new_song = {
            song_code: song_code,
            name: name
          }
          Song.create(new_song)
            .then((songJustAdded) => {
              compositeKeyObj.songId = songJustAdded.get('id'); // After adding song, add it to queue table. 
              next();
            })
            .catch((err) => {
              res.status(400).json(err); // If cannot add song, send ERROR message
            });
        }
        compositeKeyObj.songId = song.get('id');
        next();
      });
  };

  const getLobbyId = (req, res, next) => {
    const { lobby_code } = req.body
    Lobby.findOne({
      where: { lobby_code: lobby_code }
    })
      .then(lobby => {
        if (!lobby) { // if lobby not found, then we received wrong code from frontend. 
          return res.sendStatus(404);
        }
        compositeKeyObj.lobbyId = lobby.get('id');
        next();
      });
  };

  const addSongToQueueTableUsingCompositeKey = (req, res, next) => {
    const songEntryToQueue = {
      rate: 0,
      lobbyId: compositeKeyObj.lobbyId,
      songId: compositeKeyObj.songId
    }
    Queue.create(songEntryToQueue)
      .then((newEntry) => {
        res.status(200).json(newEntry); // After adding, send OK message and return the obj just added to queue
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  return [
    logEndPoint,
    checkIfSongExistAlready,
    getLobbyId,
    addSongToQueueTableUsingCompositeKey
  ];
};

module.exports = setup;
