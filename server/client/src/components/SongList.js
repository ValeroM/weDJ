import React from 'react';
import '../App.css';
import '../style/songlist.css'
import Cookies from 'js-cookie';
import gif from '../img/dogtyping.gif'

class songList1 extends React.Component {
    
  state = {
    songList: [],
    lobbyid: '',
    haslist: false
  }

    componentDidMount = () => {

      let has = false
      
      if(this.props.songList.length >= 1){
        has = true
      }
      else has = false
      
      this.setState({
        songList: this.props.songList,
        lobbyid: this.props.lobbyid,
        haslist: has
      })

      const refresh = setInterval( async() =>{
        const response = await fetch(`https://wedj-backend.herokuapp.com/songs/queue/${this.state.lobbyid}`)
        .then(res =>
            res.json())
            .then(data => {
                if(data.length >= 1){

                    data.sort((a, b) => a.rate > b.rate ? -1 : 1)
                    
                    this.setState({
                        songList: data,
                        haslist: true
                    })
                }
                else {
                  this.setState({
                      haslist: false
                  })
                }
            });
    }, 1000)
      
    }
  
    likeHandler = async(code) => {
      
      let newlist = this.state.songList
      
      for( let i = 0; i < newlist.length; i ++ ){
        if( newlist[i].song_code === code ){
          newlist[i].rate = newlist[i].rate + 1;
          
        }
      }
      this.setState({
        songList : newlist
      })

      Cookies.set(`rate${code}`, 'voted', {path: ''});

      const resp = await fetch(`https://wedj-backend.herokuapp.com/songs/rate/${this.state.lobbyid}/${code}/1`, {
        method: "PUT"
      }).catch(err => console.log(err))

    }
    
    dislikeHandler = async(code) => {
      
      let newlist = this.state.songList
  
      for( let i = 0; i < newlist.length; i ++ ){
        if( newlist[i].song_code === code ){
          newlist[i].rate = newlist[i].rate - 1;
  
        }
      }
      this.setState({
        songList : newlist
      })

      Cookies.set(`rate${code}`, 'voted', {path: ''});

      const resp = await fetch(`https://wedj-backend.herokuapp.com/songs/rate/${this.state.lobbyid}/${code}/-1`, {
        method: "PUT"
      }).catch(err => console.log(err))

    }
  
    removeCookies = (code) => {
      Cookies.remove(`rate${code}`, {path: ''})
    }

    rendersongList = () =>{
      
      let songList = this.state.songList;
  
      let JSXoutList = songList.map((song) =>
      <div key={song.song_code}>
      <div className='songblock'>
        <p className='title'><span>&#127925;</span>&nbsp;{song.name}	&nbsp;	&nbsp;Rating:&nbsp;{song.rate}</p>
        
        <button className="votebtn btn btn-outline-danger" onClick={()=>this.likeHandler(song.song_code)} 
          disabled={Cookies.get(`rate${song.song_code}`) === 'voted'} >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fillRule="evenodd" 
          d="M15.98 8.17l-.97 5.95C14.84 15.5 13.13 16 12 16H5.69c-.2 0-.38-.05-.53-.14L3.72 15H2c-1.06 0-2-.94-2-2V9c0-1.06.94-2.02 2-2h2c.91 0 1.39-.45 2.39-1.55.91-1 .88-1.8.63-3.27-.08-.5.06-1 .42-1.42C7.83.29 8.42 0 9 0c1.83 0 3 3.71 3 5.01l-.02.98h2.04c1.16 0 1.95.8 1.98 1.97 0 .11-.02.21-.02.21zm-1.97-1.19h-1.99c-.7 0-1.03-.28-1.03-.97l.03-1.03c0-1.27-1.17-4-2-4-.5 0-1.08.5-1 1 .25 1.58.34 2.78-.89 4.14C6.11 7.25 5.36 8 4 8v6l1.67 1H12c.73 0 1.95-.31 2-1l.02-.02 1-6c-.03-.64-.38-1-1-1h-.01z"/></svg>
          &nbsp;
        </button>
        
        &nbsp;
        
        <button className="votebtn btn btn-outline-secondary" onClick={()=>this.dislikeHandler(song.song_code)}
          disabled={Cookies.get(`rate${song.song_code}`) === 'voted'} >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fillRule="evenodd" 
          d="M15.98 7.83l-.97-5.95C14.84.5 13.13 0 12 0H5.69c-.2 0-.38.05-.53.14L3.72 1H2C.94 1 0 1.94 0 3v4c0 1.06.94 2.02 2 2h2c.91 0 1.39.45 2.39 1.55.91 1 .88 1.8.63 3.27-.08.5.06 1 .42 1.42.39.47.98.76 1.56.76 1.83 0 3-3.71 3-5.01l-.02-.98h2.04c1.16 0 1.95-.8 1.98-1.97 0-.11-.02-.21-.02-.21zm-1.97 1.19h-1.99c-.7 0-1.03.28-1.03.97l.03 1.03c0 1.27-1.17 4-2 4-.5 0-1.08-.5-1-1 .25-1.58.34-2.78-.89-4.14C6.11 8.75 5.36 8 4 8V2l1.67-1H12c.73 0 1.95.31 2 1l.02.02 1 6c-.03.64-.38 1-1 1h-.01z"/></svg>
          &nbsp;
        </button>

        &nbsp;

        <button className="votebtn" onClick={()=>this.removeCookies(song.song_code)}>xx</button>
      </div>
      </div>
      )
  
      return JSXoutList;
    }

    render(){
 
      let renderList = this.rendersongList();
      return(
        <div className="text-center">
          {this.state.haslist && 
            (<div><h5 style={{paddingTop: '5px', paddingBottom: '5px'}}>Now Playing:</h5>
                {renderList}</div>)}
          {!this.state.haslist && 
            (<div>
              <h5 style={{paddingTop: '5px', paddingBottom: '5px'}}>No song in the playlist, let's submit some!</h5>
              <img src={gif} alt="loading..." />
            </div>)}
        </div>
      )
    }
  }

export default songList1;