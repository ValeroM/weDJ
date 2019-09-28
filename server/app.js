const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //  basically tells the system that we want json to be used.

const port = process.env.PORT || 7000;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
