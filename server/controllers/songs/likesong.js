const mockSongsData = require("../../mockDataSongs"); // this object will simulate an intity and its properties -- the stuff we will actually use whenever we have a db

// WORK IN PROGRESS, TRY TO ADD A LIKE TO A SONG WITH THE SPECIFIED ID

const setup = () => {
  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [POST] /songs/likesong/:songId endpoint");
    next();
  };

  const updateSongLike = (req, res, next) => {
    console.log("song body request: ", req.body); // the body of the request has the song to update the like
    const sId = req.body.songId;
    console.log("checking i got id: " + sId);
    next();
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
