import React from 'react';
import '../App.css';
import '../style/page.css'
import SongManage from "../components/SongManage";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import YouTube from 'react-youtube';
import searchYoutube from 'youtube-api-v3-search';
import gif from '../img/dogtyping.gif'
import Footer from '../components/Footer';

const KEY = 'AIzaSyD3HRQUlqpsjJdJoWRLhMyMx3Luw_Ho7Lo';


export default class AdminPage extends React.Component{
    state = {
        songList: [],
        newsongList: [],
        videoList: [],
        playingVideo: null,
        lobbyid:'',
        hasVideo: false,
        PlayingId: '',
        playingName: '',
        selected: false
    }

    componentDidMount = async() => {

        let roomid = this.props.match.params.id

        const response = await fetch(`https://wedj-backend.herokuapp.com/songs/queue/${roomid}`
            ).then(response => 
                response.json()
            )
            .then(data => {
                let list = data;

                if( data.length !=0 ){

                    list.sort((a, b) => (a.rate < b.rate) ? 1 : -1)

                    this.setState({
                        songList: list,
                        playingId: list[0].song_code,
                        playingName: list[0].name,
                        lobbyid : roomid,
                        hasVideo: true,
                        newsongList: list
                    })
                }
                else {
                    this.setState({
                        lobbyid : roomid,
                        hasVideo: false
                    })
                }
            }).catch( err =>{
                alert(err)
            })

            //document.addEventListener('touchstart', handler, {passive: true});

            const refresh = setInterval( async() =>{
                const response = await fetch(`https://wedj-backend.herokuapp.com/songs/queue/${roomid}`)
                .then(res =>
                    res.json())
                    .then(data => {
                        
                        if(data.length >= 1){
                            
                            for( let i = 0; i < data.length; i++ ){
                                if( data[i].song_code === this.state.playingId ){
                                    this.deleteHandler(data[i].song_code, data[i].name)
                                    data.splice( i, 1 )
                                }
                            }
                            
                            data.sort((a, b) => (a.rate < b.rate) ? 1 : -1)
                            
                            this.setState({
                                newsongList: data
                            })
                    }
                    });
            }, 1000)
    }

    searchHandler = async ( keyword ) => {

        const response = await searchYoutube( KEY, {
            q: keyword,
            part:'snippet',
            type:'video',
            maxResults: 10,
          })
        
        this.setState({
            videoList: response.items,
            selected: false
        })
    }

    selectHandler = async(video) => {
        if( window.confirm("Are you sure to choose this track?") ){

            let id = video.id.videoId
            let title = video.snippet.title
            let lobbyid  = this.state.lobbyid

            await fetch('https://wedj-backend.herokuapp.com/songs/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    song_code: id,
                    name: title,
                    lobby_code: lobbyid
                })
            })

            this.setState({
                selected: true,
                videoList: [],
                playingVideo: video
            });
        }
    }


    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
        
    }

    deleteHandler = async(code,name) =>{
        const res = await fetch("https://wedj-backend.herokuapp.com/songs/delete", {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    song_code: code,
                    name: name,
                    lobby_code: this.state.lobbyid
            })
        }).catch( err => console.log(err))
    }


    _onEnd = (playingId) =>{

        let list = this.state.newsongList;

        if( list.length != 0 ){
            
            let newid = list[0].song_code
            let newname = list[0].name
    
            this.setState({
                songList: list,
                playingId: newid,
                playingName: newname
            })
        }
        else{
            this.setState({
                songList: list,
                playingId: '',
                hasVideo: false
            })
        }
    }

    render(){

        document.body.style.backgroundColor = "#fefbd8";

        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1
            }
        };

        return(
            <div>
                <div>
                    <div className="text-center">
                        <h1 className='page-header'>Welcome to Your Party</h1>
                        <h4>Your Party Code is: {this.state.lobbyid}</h4>
                    </div>
                    
                    <div className="text-center searchbar">
                        <SearchBar submitBack={this.searchHandler} />
                    </div>
                        <div className="text-center">
                            {!this.state.hasVideo && 
                                (<div><h5 style={{paddingTop: '5px', paddingBottom: '5px'}}>No current playing, let's submit some!</h5>
                                    <img src={gif} alt="loading..." /></div>)}
                            {this.state.hasVideo && (
                            <div className="player-section">
                            <div>
                                <YouTube
                                    videoId={this.state.songList[0].song_code}
                                    opts={opts}
                                    onReady={this._onReady}
                                    onEnd={()=>this._onEnd(this.state.PlayingId)}
                                />
                            </div>
                            <p>Now Playing: {this.state.songList[0].name}</p>
                            </div>)}
                        </div>
                        <div>
                    {!this.state.selected && (
                        <div>
                        <VideoList selectHandler={this.selectHandler} videos={this.state.videoList}/>
                    </div>
                    )}
                    {this.state.selected && (
                        <div>
                            <h3>Track submitted!</h3>
                        </div>
                    )}
                </div>
                    <h2 className="text-center">Manage Your Party</h2>
                    {this.state.lobbyid && <SongManage songList={this.state.newsongList} lobbyid={this.state.lobbyid}/> }
                </div>
                <Footer />
            </div>
        )
    }
}