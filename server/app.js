const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const attachRoutes = require("./routes"); // whenever we require a whole directory, node looks for the "index.js" fle FIRST under that directory we required

app.use(bodyParser.json()); //  basically tells the system that we want json to be used.

const port = process.env.PORT || 7000;

attachRoutes(app);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
