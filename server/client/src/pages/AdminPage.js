import React from 'react';
import '../App.css';
import SongManage from "../components/SongManage";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import YouTube from 'react-youtube';
import searchYoutube from 'youtube-api-v3-search';

const KEY = 'AIzaSyD3HRQUlqpsjJdJoWRLhMyMx3Luw_Ho7Lo';


export default class AdminPage extends React.Component{
    state = {
        songList: [],
        videoList: [],
        playingVideo: null,
        lobbyid:'',
        hasVideo: false,
        PlayingId: '',
    }

    componentDidMount = async() => {

        const response = await fetch("http://localhost:7001/api/songs"
            ).then(response => 
                response.json()
            )
            .then(data => {
                let list = data;

                if( data ){
                    this.setState({
                        songList: list,
                        playingId: list[0].song_code,
                        lobbyid : this.props.match.params.id,
                        hasVideo: true
                    })
                }
                else {
                    this.setState({
                        lobbyid : this.props.match.params.id,
                        hasVideo: false
                    })
                }
            }).catch( err =>{
                alert(err)
            });

            //document.addEventListener('touchstart', handler, {passive: true});
        
    }

    searchHandler = async ( keyword ) => {

        const response = await searchYoutube( KEY, {
            q: keyword,
            part:'snippet',
            type:'video',
            maxResults: 10,
          });
        
        this.setState({
            videoList: response.items
        });
    }

    selectHandler = (video) => {
        if( window.confirm("Are you sure to choose this track?") ){
            this.setState({
                playingVideo: video
            });
        }
    }


    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        
    }


    _onEnd = (playingId) =>{
    
        let list = this.state.songList

        //remove song from queue then
        list.shift();

        let newid = list[0].song_code
    
        this.setState({
            songList: list,
            playingId: newid
        })
    
    }


    render(){

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
                        <h2>Welcome to Your Party</h2>
                        <h4>Your Party Code is: {this.state.lobbyid}</h4>
                    </div>
                    
                    <div className="text-center">
                        <SearchBar submitBack={this.searchHandler} />
                    </div>
                        <div className="text-center">
                            {!this.state.hasVideo && (<div>No Current Playing</div>)}
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
                            <p>{this.state.songList[0].name}</p>
                            </div>)}
                        </div>
                    <div>
                        <VideoList selectHandler={this.selectHandler} videos={this.state.videoList}/>
                    </div>
                    <h2 className="text-center">Manage Your Party</h2>
                    <br/>
                    {this.state.lobbyid && <SongManage songList={this.state.songList} lobbyid={this.state.lobbyid}/> }
                </div>
            </div>
        )
    }
}