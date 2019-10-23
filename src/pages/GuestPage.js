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
        selectedVideo: null,
        selected: false
    }

    searchHandler = async (termFromSearchBar) => {
        
        const response = await searchYoutube( KEY, {
            q:termFromSearchBar,
            part:'snippet',
            type:'video',
            maxResults: 5,
          });
        
        this.setState({
            videoList: response.items,
            selected: false
        });
    }

    selectHandler = (video) =>{

        if( window.confirm("Are you sure to choose this track?") ){
            /*************************************** */
            //Store the following three data to DB and remount the component to render it into song list
            //video ID
            console.log(video.id.videoId);
            //video title
            console.log(video.snippet.title);
            //video img smallest
            let url = video.snippet.thumbnails.default.url;

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
                <SongList />
            </div>
        )
    }
}