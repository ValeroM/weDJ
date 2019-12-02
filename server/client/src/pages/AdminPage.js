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

        const response = await fetch(`http://localhost:7001/api/songs/queue/${roomid}`
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
                const response = await fetch(`http://localhost:7001/api/songs/queue/${roomid}`)
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

                            //console.log(this.state.newsongList)
                    }

                    });
            }, 5000)
        
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

            await fetch('http://localhost:7001/api/songs/add', {
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


    _onEnd = (playingId) =>{

        /*
        let list = []

        const response = await fetch("http://localhost:7001/api/songs"
            ).then(response => 
                response.json()
            )
            .then(data => {
                list = data;
            });

        list.sort((a, b) => (a.id > b.id) ? 1 : -1)
        //remove song from queue then
        for( let i = 0; i < list.length; i++ ){
            if( list[i].song_code === playingId ){
                list.splice( i, 1 )
            }
        }*/
        let list = this.state.newsongList;

        /*for( let i = 0; i < list.length; i++ ){
            if( list[i].song_code === playingId ){
                list.splice( i, 1 )
                this.deleteHandler(list[i].song_code, list[i].name)
            }
        }*/

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
                            <p>Playing</p>
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
                    <br/>
                    {this.state.lobbyid && <SongManage songList={this.state.newsongList} lobbyid={this.state.lobbyid}/> }
                </div>
            </div>
        )
    }
}