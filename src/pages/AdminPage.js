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
        playingVideo: null
    }



    searchHandler = async ( keyword ) => {

        const response = await searchYoutube( KEY, {
            q: keyword,
            part:'snippet',
            type:'video',
            maxResults: 3,
          });
        
        this.setState({
            videoList: response.items
        })
    }

    selectHandler = (video) => {
        this.setState({playingVideo: video})
    }

    render(){
        return(
            <div>
                <div className="text-center">
                    <SearchBar submitBack={this.searchHandler} />
                    <div>
                    <div>
                        <div>
                            <Player/>
                        </div>
                        <div>
                            <VideoList selectHandler={this.selectHandler} videos={this.state.videoList}/>
                        </div>
                    </div>
                </div>
                    <h2>Manage Your Party</h2>
                    <br/>
                    <SongManage />
                </div>
            </div>
        )
    }
}