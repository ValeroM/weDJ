const mockSongsData = require("../../mockDataSongs"); // this object will simulate an intity and its properties -- the stuff we will actually use whenever we have a db

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] /songs/like/:songId endpoint");
    next();
  };

  const updateSongLike = (req, res, next) => {
    const songExist = mockSongsData.some((element) => {
      return element.songID == req.body.songID;
    });
    if (songExist) {
      for (let songsInArr of mockSongsData) {
        if (songsInArr.songID === req.body.songID) {
          let newObj = {
            songID: songsInArr.songID,
            songName: songsInArr.songName,
            songArtist: songsInArr.songArtist,
            songAlbum: songsInArr.songAlbum,
            likes: songsInArr.likes + 1,
            dislikes: songsInArr.dislikes
          };
          let currentIndex = mockSongsData.indexOf(songsInArr);
          mockSongsData.splice(currentIndex, 1, newObj); //removing the old object and adding the new one
          break;
        }
      }
      next();
    } else {
      res.status(400).send("Song Id does not exist in our fake database");
    }
  };

  const sendResponse = (req, res, next) => {
    console.log(
      "Sending back the following message:\n" +
        "You've updated the song amount of likes!"
    );
    res.status(200).send("You've updated the song amount of likes");
  };

  return [logEndPoint, updateSongLike, sendResponse]; // performs the methods we declared
};

module.exports = setup;
