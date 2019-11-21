const express = require("express");
const { songs } = require("../controllers"); // the syntax "{ songs }" is the destructuring assignment syntax. This is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects,into distinct variables.
// in order to be able to use the controllers by importing from the controller directory, the "songs"  variable has to match the key under the index.js file under controllers directory

const setup = () => {
  const controller = songs(); // imports the controllers (i.e, whatever logic we want to perform)
  const router = express.Router();

  router.get("/", controller.songsOnQueue); // calls the actual logic from the controller/songs/songs.js file
  router.post("/", controller.addSongsToQueue); // logic from controller/songs/postsongs.js
  router.post("/rate", controller.addSongRating); // Update song's rating

  return router;
};

module.exports = setup;
