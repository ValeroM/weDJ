const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const attachRoutes = require("./routes"); // whenever we require a whole directory, node looks for the "index.js" fle FIRST under that directory we required
const db = require("./database/models");

app.use(bodyParser.json()); //  basically tells the system that we want json to be used.

const port = process.env.PORT || 7001; // Uses 7000 as port

attachRoutes(app); // ignore

/*
creates tables assuming they dont exist. -- should be false by default, though.
db.sequelize.sync({ force: false });

If you already have all the tables, it will not do anything. 
However if you use force: true, it will drop the table that exists and recreate them from the model definition.
In other words, update DB tables based on model updates. Does not handle renaming tables/columns

NOTE: toggling this to true drops all tables (including data)
*/

// Creates table if it doesn't exist
db.sequelize
  .sync({ force: true }) // THE DB IN UR LOCAL MACHINE HAS THE OLD TABLES. USE THIS TO DROP THEM AND RECREATE THEM
  // THEN CHANGE IT TO: .sync() so that u stop dropping the tables all the time 
  .then(() => console.log("Database connected. Tables Synced!"))
  .catch((err) => console.error("Error. Syncing did not occur because: ", err));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
