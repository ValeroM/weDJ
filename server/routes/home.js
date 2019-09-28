const express = require("express");
const { songs } = require("../controllers");

const setup = () => {
  const controller = songs();
  const router = express.Router();

  router.get("/", controller);

  return router;
};

module.exports = setup;
