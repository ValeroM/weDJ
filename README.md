# weDJ

This is weDJ. We are a web application that allows people to have a dynamic, shared playlist.  

# Table of Contents
- [Setup Guide](#setup-guide)
- [Backend](#backend)
  - [API Overview](#api-overview)
    - [Songs](#songs)
    - [Lobbies](#lobbies)
  - [API Details](#api-details)
    - [Songs](#songs)
    - [Lobbies](#lobbies)

# Setup guide

To set our app locally, here are the steps:

1. Open Terminal and run the following commands in order

    1A. Install `brew services`, if you don't already have it installed:

        `brew tap homebrew/services`

2. You can start, stop, or restart the postgres server with the following commands:

    2A. To start: `brew services start postgresql`

    2B. To stop: `brew services stop postgresql`

    2C. To restart: `brew services restart postgresql`
        
    Advice:
    
        If these commands are difficult to remember, feel free to add aliases in your `.bashrc file`. This file is usually located in your home directory.

##### Create a user for the database

1. Enter: `$ createuser -P -s -e musician_user`

    > This command creates a new postgres user called `musician_user` with super privileges and prompts for a password. **Use password: "musician_pass"**.

##### Create the database

1. Enter: `$ createdb -h localhost -U musician_user weDJ_development`

    > This command creates a database named `weDJ_development` that is owned by `musician_user` and can only be accessed via `localhost`

2. In Terminal, download the repository:

    `git clone https://github.com/ValeroM/weDJ.git`
    
3. Navigate to the 'client' directory inside the repository and install its dependencies

    `cd weDJ/server/client`

    `npm install`

4. Return to 'server' directory and install its dependencies

    `cd ..`

    `npm install`

5. Start weDJ's server locally on your machine.

    `npm run dev` 

    > This command will start both, the frontend the and backend _locally_ at localhost http://localhost:3000 and http://localhost:7001/api respectivetly.  
    
# Backend

# API Overview

## Base

| endpoint               | description       |
| ---------------------- | ----------------- |
| `[GET] /api` | welcoming message |

## Songs

| endpoint                              | description                                |
| ------------------------------------- | ------------------------------------------ |
| `[GET] /api/songs`                    | Get songs in table "songs"                   |
| `[GET] /api/songs/queue/:lobbycode`   | Get all the songs in a queue from a specific lobby  |
| `[POST] /api/songs`                   | Store a new song in table "songs"            |
| `[POST] /api/songs/add`                | Add a song to the queue from a specific lobby  | 
| `[DELETE] /api/songs/delete`                | Delete a song from queue table for a specific lobby  | 
| `[PUT] api/songs/rate/:lobbycode/:songcode/:rate`  | Update the rate of a song in a specific lobby |  

## Lobbies

| endpoint                              | description                                |
| ------------------------------------- | ------------------------------------------ |
| `[GET] /api/lobbies`                  | Get all lobbies store in lobby table       |
| `[POST] /api/lobbies`                 | Create a new lobby                         |  
| `[DELETE] /api/lobbies/delete`        | Delete songs in queue from the specified lobby and then deletes the lobby |  

# API Details  

#### `[GET] /api/songs`  

Returns a json array with objects, where each object is a song in "songs" table:  

```json
[
  {
    "id": 1,  
    "song_code": "first song code",  
    "name": "1st song",  
    "createdAt": "2019-11-24T19:46:36.192Z",  
    "updatedAt": "2019-11-24T19:46:36.192Z"  
  },
  {
    "id": 2,
    "song_code": "second song code",
    "name": "2nd song",
    "createdAt": "2019-11-24T19:47:48.020Z",
    "updatedAt": "2019-11-24T19:47:48.020Z"
  },
  {
    "id": 3,
    "song_code": "third song code",
    "name": "3rd song",
    "createdAt": "2019-11-24T19:48:06.961Z",
    "updatedAt": "2019-11-24T19:48:06.961Z"
  }
]  
```

#### `[GET] /api/songs/queue/:lobbycode`  

Expects in the request parameter the lobby code:  

`/api/songs/queue/LobbyCodeHere`

Returns a json of array of objects, where each object is a song from the queue for that specific lobby:  

```json
[
  {
    "id": 1,
    "rate": 1,
    "name": "1st song",
    "song_code": "first song code"
  }
] 
```

#### `[POST] /api/songs`  

Expects in the request body:  

```json
{
 "song_code": "song code from YT Api",
 "name": "some song name"
}
```

Returns a json object with the new song added to our songs table:  

```json
{
  "id": 4,
  "song_code": "some song code",
  "name": "some song name",
  "updatedAt": "2019-11-24T20:45:12.116Z",
  "createdAt": "2019-11-24T20:45:12.116Z"
}
```

#### `[POST] /api/songs/add`  

Expects in the request body:  

```json
{
 "song_code": "song code from YT Api",
 "name": "some song name",
 "lobby_code": "some lobby code"
}
```

Returns a json object with the new song added to our queue table:  

```json
{
  "rate": 1,
  "lobbyId": 1,
  "songId": 2,
  "updatedAt": "2019-11-24T20:58:50.054Z",
  "createdAt": "2019-11-24T20:58:50.054Z"
}
```  

#### `[DELETE] /api/songs/delete`  

Expects in the request body:  

```json
{
 "song_code": "song code from YT Api",
 "name": "some song name",
 "lobby_code": "some lobby code"
}
```  

Returns a json number, where 1 means sucessful and 0 means unsuccessful:  

```json
1
```
or 
```json 
0 
```  

#### `[PUT] /api/songs/rate/:lobbycode/:songcode/:rate`  

Expects in the request parameter the lobby code, song code and 1 or -1 for the rate:  

`/api/songs/rate/LobbyCodeHere/songCodeHere/1`  
or  
`/api/songs/rate/LobbyCodeHere/songCodeHere/-1` 

Returns OK if update was succesfull, else it returns a bad request.  

#### `[GET] /api/lobbies`  

Returns a json array with objects, where each object is a lobby in "lobbies" table:  

```json
[
  {
    "id": 1,
    "name": "first lobby",
    "lobby_code": "Rv96ew",
    "createdAt": "2019-11-24T19:45:16.488Z",
    "updatedAt": "2019-11-24T19:45:16.488Z"
  },
  {
    "id": 2,
    "name": "second lobby",
    "lobby_code": "JRfgkc",
    "createdAt": "2019-11-24T19:45:24.621Z",
    "updatedAt": "2019-11-24T19:45:24.621Z"
  },
  {
    "id": 3,
    "name": "third lobby",
    "lobby_code": "xWaG2z",
    "createdAt": "2019-11-24T19:45:28.822Z",
    "updatedAt": "2019-11-24T19:45:28.822Z"
  }
]
```

#### `[POST] /api/lobbies`   

Expects in the request body:  

```json 
{
 "name": "new lobby name"
}  
```

Returns a json object with the lobby code created for the lobby  

```json 
{
  "id": 4,
  "name": "lobby name",
  "lobby_code": "some lobby code",
  "updatedAt": "2019-11-24T21:02:01.948Z",
  "createdAt": "2019-11-24T21:02:01.948Z"
}
```  

#### `[DELETE] /api/lobbies/delete`  

Expects in the request body:  

```json 
{
 "lobby_code": "some lobby code"
}  
```  
Returns a json number, where 1 means sucessful and 0 means unsuccessful:  

```json
1
```
or 
```json 
0 
```  
