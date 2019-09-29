const setup = () => {
  mockDataSongs = [
    { artist: "Black Eyed Peas", songName: "I got a feeling" },
    { artist: "Jimmy Eat World", songName: "The Middle" },
    { artist: "Kendrcik Lamar", songName: "HUMBLE" }
  ];

  const logEndPoint = (req, res, next) => {
    console.log("You have hit the [GET] /songs endpoint");
    next();
  };

  const sendResponse = (req, res, next) => {
    console.log("Sending back some songs now");
    let songs = [];
    mockDataSongs.forEach(element => {
      songs.push(element.songName);
    });
    res.status(200).json(songs);
  };

  return [logEndPoint, sendResponse]; // performs the methods we declared
};

module.exports = setup;
