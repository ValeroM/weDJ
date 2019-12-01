import React from 'react';
import '../App.css';
import SongList from "../components/SongList";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import Player from "../components/Player";
import searchYoutube from 'youtube-api-v3-search';
import YouTube from 'react-youtube';
import Cookies from 'js-cookie';

const KEY = 'AIzaSyD3HRQUlqpsjJdJoWRLhMyMx3Luw_Ho7Lo';


export default class AdminPage extends React.Component{
    state = {
        videoList: [],
        songList: [],
        selectedVideo: null,
        selected: false,
        lobbyid: null
    }

    componentDidMount = async () => {

        let roomid =  this.props.match.params.id

        /*let xhr = new XMLHttpRequest()

        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log(xhr.response.json())
          })
          // open the request with the verb and the url
          xhr.open('GET', 'http://localhost:7001/api/songs/queue')
          // send the request
          xhr.send(JSON.stringify({ lobby_code: roomid }))*/
        
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

            console.log(this.state.songList)
        
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
        return(
            <div className="text-center">
                <h1>Welcome to the Party!</h1>
                <SearchBar submitBack={this.searchHandler} />
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
            </div>
        )
    }
}