const express = require("express");
const { songs } = require("../controllers");

const setup = () => {
  const controller = songs(); // imports the controllers (i.e, whatever logic we want to perform)
  const router = express.Router();

  router.get("/", controller); // calls the actual logic from the controller/songs.js file

  return router;
};

module.exports = setup;
