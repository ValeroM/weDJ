import React from 'react';
import '../App.css';
import '../style/songlist.css';

class SongList extends React.Component {
    
    state = {
        songList: [],
        lobbyid: ''
    }

    componentDidMount = () => {

        this.setState({
          songList: this.props.songList,
          lobbyid: this.props.lobbyid
        })
  
    }

    componentWillReceiveProps({songList}) {
      this.setState({
        songList: songList
      })
    }
    
    deleteHandler = async(code,name) =>{
      const res = await fetch("http://localhost:7001/api/songs/delete", {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  song_code: code,
                  name: name,
                  lobby_code: this.state.lobbyid
          })
      }).catch( err => console.log(err))
  }

    removeHandler = (code) => {
      
      if(window.confirm("Are you sure you want to delete this song?")){

        let newlist = this.state.songList
  
        for( let i = 0; i < newlist.length; i ++ ){
            if( newlist[i].song_code === code ){
              this.deleteHandler(newlist[i].song_code, newlist[i].name, this.state.lobbyid)
                newlist.splice( i, 1 );
  
        }
        }
          this.setState({
              songList : newlist
        })

      }

    }
  
    renderSongList = () =>{
      
        let songlist = this.state.songList;
    
        songlist.sort((a, b) => a.likes > b.likes ? -1 : 1)
    
        let JSXoutList = songlist.map((song) =>
        <div key={song.song_code}>
        <div className='songblock'>
          <span className='title'><span>&#127925;</span>&nbsp;{song.name}	&nbsp;	&nbsp;Rating:&nbsp;{song.rate}</span>

            <button className="votebtn btn btn-outline-danger" onClick={()=>this.removeHandler(song.song_code)}>X</button>
        </div>
        </div>
      )
  
      return JSXoutList;
    }
  
    render(){
    
        let renderList = this.renderSongList();
        return(
            <div className="text-center">
            <div>
                <h5 style={{paddingTop: '5px', paddingBottom: '5px'}}>Song List:</h5>
                    <br/>
                    {renderList}</div>
            </div>
        )
        }
  }

export default SongList;