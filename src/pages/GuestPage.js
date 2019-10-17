import React from 'react';
import '../App.css';
import SongList from "../components/SongList";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import Player from "../components/Player";
import searchYoutube from 'youtube-api-v3-search';

const KEY = 'AIzaSyD3HRQUlqpsjJdJoWRLhMyMx3Luw_Ho7Lo';


export default class AdminPage extends React.Component{
    state = {
        videoList: [],
        selectedVideo: null
    }

    searchHandler = async (termFromSearchBar) => {
        
        const response = await searchYoutube( KEY, {
            q:termFromSearchBar,
            part:'snippet',
            type:'video',
            maxResults: 5,
          });
        
        this.setState({
            videoList: response.items
        });
    }

    selectHandler = (video) =>{
        this.setState({
            selectedVideo: video
        });
    }

    render(){
        return(
            <div className="text-center">
                <h1>Welcome to the Party!</h1>
                <SearchBar submitBack={this.searchHandler} />
                <div>
                    <div>
                        <Player video={this.state.selectedVideo}/>
                    </div>
                    <div>
                        <VideoList selectHandler={this.selectHandler} videos={this.state.videoList}/>
                    </div>
                </div>
                <SongList />
            </div>
        )
    }
}