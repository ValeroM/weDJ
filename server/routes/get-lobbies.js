const express = require("express");
const { lobbies } = require("../controllers"); // gets lobbies directory from the index.js under controllers directory

const setup = () => {
  const controller = lobbies(); // imports the controllers (i.e, whatever logic we want to perform)
  const router = express.Router();

  router.post("/:name", controller.addNewLobby);

  return router;
};

module.exports = setup;
