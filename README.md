# weDJ

This is weDJ. We are a web application that allows people to have a dynamic, shared playlist.

# Setup guide

To set our app locally, here are the steps:

Open up the terminal and run these commands in this order

First, install brew services if you don't already have it installed:

`brew tap homebrew/services`

Next, you can start, stop, or restart the postgres server with the following commands:

For starting it up:

`brew services start postgresql`

For stopping the server:

`brew services stop postgresql`

To restart the server run:

`brew services restart postgresql`

##### Create a user for the database

`$ createuser -P -s -e musician_user`

> This command creates a new postgres user called `musician_user` with super privileges and prompts for a password. **Use password: "musician_pass"**.

##### Create the database

`$ createdb -h localhost -U musician_user weDJ_development`

> This command creates a database named `weDJ_development` that is owned by `musician_user` and can only be accessed via `localhost`

Open up a new terminal and do the following steps:

`git clone https://github.com/ValeroM/weDJ.git`

`cd weDJ/server/client`

`npm install`

> This command makes sure the _client_ is ready to go

`cd ..`

> Back out to server

`npm install`

> This command makes sure the _server_ is ready to go

`npm run dev`

> This command will start both, the frontend the and backend _locally_ at localhost http://localhost:3000 and http://localhost:7001/api respectivetly.
