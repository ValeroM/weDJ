import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

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

  likeHandler = (song) => {
    let newlist = this.state.songList

    for( let i = 0; i < newlist.length; i ++ ){
      if( newlist[i].name === song ){
        newlist[i].likes = newlist[i].likes + 1;
        
      }
    }
    this.setState({
      songList : newlist
    })
  }
  
  dislikeHandler = (song) => {
    
    let newlist = this.state.songList

    for( let i = 0; i < newlist.length; i ++ ){
      if( newlist[i].name === song ){
        newlist[i].dislikes = newlist[i].dislikes + 1;

      }
    }
    this.setState({
      songList : newlist
    })
  }

  renderSongList = () =>{
    
    let songlist = this.state.songList;

    songlist.sort((a, b) => a.likes > b.likes ? -1 : 1)

    let JSXoutList = songlist.map((song) =>
    <div>
    <div id={song.name} className="song">
      &#127925;
      {song.name}, Artist:{song.artist}
      <Button onClick={()=>this.likeHandler(song.name)}>;) {song.likes} </Button>
      <Button onClick={()=>this.dislikeHandler(song.name)}>:( {song.dislikes} </Button>
    </div>
    <br/>
    </div>
    )

    return JSXoutList;
  }

  render(){

    let renderList = this.renderSongList();
    return(
      <div>
        {renderList}
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
