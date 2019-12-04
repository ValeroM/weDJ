import React from 'react';
import '../App.css';
import '../style/page.css'
import SongList from "../components/SongList";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import Player from "../components/Player";
import searchYoutube from 'youtube-api-v3-search';
import YouTube from 'react-youtube';
import Cookies from 'js-cookie';
import Footer from '../components/Footer'

const KEY = 'AIzaSyD3HRQUlqpsjJdJoWRLhMyMx3Luw_Ho7Lo';


export default class AdminPage extends React.Component{
    state = {
        videoList: [],
        songList: [],
        selectedVideo: null,
        selected: false,
        lobbyid: null,
        nowplaying: ''
    }

    componentDidMount = async () => {

        let roomid =  this.props.match.params.id
        
        const response = await fetch(`http://localhost:7001/api/songs/queue/${roomid}`)
            .then(response => 
                response.json()
            )
            .then(data => 
                this.setState({
                    songList: data,
                    lobbyid: roomid
                })
            )
        
    }

    searchHandler = async (termFromSearchBar) => {
        
        const response = await searchYoutube( KEY, {
            q:termFromSearchBar,
            part:'snippet',
            type:'video',
            maxResults: 5,
            videoCategoryId: 10,
          }); 
        
        this.setState({
            videoList: response.items,
            selected: false
        });
    }

    selectHandler = async (video) =>{

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
                selectedVideo: video
            });
        }
    }

    render(){

        document.body.style.backgroundColor = "#fefbd8";

        return(
            <div className="text-center page-bg">
                <h1 className='page-header'>Welcome to the Party!</h1>
                <div className='searchbar'>
                    <SearchBar submitBack={this.searchHandler} />
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
                    {this.state.lobbyid && <SongList songList={this.state.songList} lobbyid={this.state.lobbyid}/> }
                    <Footer />
            </div>
        )
    }
}