const express = require("express");

const routes = () => {
  const app = express();

  app.use("/songs", require("./home")());

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
