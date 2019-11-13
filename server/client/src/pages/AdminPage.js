import React from 'react';
import '../App.css';
import SongManage from "../components/SongManage";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import Player from "../components/Player";
import searchYoutube from 'youtube-api-v3-search';

const KEY = 'AIzaSyD3HRQUlqpsjJdJoWRLhMyMx3Luw_Ho7Lo';


export default class AdminPage extends React.Component{
    state = {
        videoList: [],
        playingVideo: null,
        lobbyid:''
    }

    componentDidMount = () => {
        this.setState({
            lobbyid : this.props.match.params.id
        })
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

    render(){
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
                            <Player video={this.state.playingVideo}/>
                        </div>
                        <div>
                            <VideoList selectHandler={this.selectHandler} videos={this.state.videoList}/>
                        </div>
                    <h2 className="text-center">Manage Your Party</h2>
                    <br/>
                    <SongManage />
                </div>
            </div>
        )
    }
}