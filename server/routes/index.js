const express = require("express");

const routes = () => {
  const app = express();

  // if the front end hits the "/songs" endpoint, it will render the getSongs.js file
  // also, it basically says mount the router as middleware at path /songs
  // then under the getSongs.js, the router.get is only for defining subpaths (i.e., /songs/somethingElse)
  app.use("/songs", require("./getSongs")());

  // if the front end hits the "/" endpoint, it will run the call back function below
  app.use("/", (req, res, next) => {
    console.log("You have hit [GET] / endpoint");
    let responseMessage = "Welcome to weDJ API";
    console.log("Sending back the following message:\n" + responseMessage);
    return res.status(200).send(responseMessage);
  });

  return app;
};

const attachRoutes = app => {
  app.use("/", routes());
};

module.exports = attachRoutes;
