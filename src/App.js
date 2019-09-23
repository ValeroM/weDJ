import React from 'react';
import './App.css';

class SongList extends React.Component {
  state = {
    songList: [
      {
        name: "Song1",
        artist: "Name1",
        likes: 4,
        dislikes: 0
      },
      {
        name: "Song2",
        artist: "Name2",
        likes: 3,
        dislikes: 1
      },
      {
        name: "Song3",
        artist: "Name3",
        likes: 2,
        dislikes: 1
      },
      {
        name: "Song4",
        artist: "Name4",
        likes: 1,
        dislikes: 4
      }
    ]
  }

  render(){

    return(
      <div>
        <p>I'm rendering</p>
      </div>
    )
  }
}


class App extends React.Component  {
  
  render(){
    return (
      <div className="App">
          <input type="text" style={{width:"25%", height:"25px"}} placeholder="Search..."/>
          <br/>
          <br/>
          <div>Now Playing:
            <br/><br/>
            <SongList /></div>
      </div>
    );
  }
}

export default App;
