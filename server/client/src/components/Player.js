import React from 'react';
import '../style/videos.css';
import YouTube from 'react-youtube';

class Player extends React.Component {
    
    state = {
        hasVideo : false,
        videoId: '',
        nextId: ''
    }

    componentDidMount = () => {
       
        if( !this.props.video ){

            this.setState({
                hasVideo: false
            })
        }

        else {
            
            this.setState({
                hasVideo: true,
                videoId: this.props.video.id.videoId
            })
        }
    }
/*

    onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        
        let list = this.state.videos
    
        this.setState({
          current: list[this.state.songIndex].id
        })
    }

    onEnd = () =>{
    
        let list = this.state.videos
        let nextIndex = this.state.songIndex + 1;
    
        if( nextIndex >= list.length ) nextIndex = 0
    
        Cookies.remove(`rate${this.state.list[0].code}`, { path: '' })
    
        this.setState({
          songIndex: nextIndex,
          current: list[nextIndex].id,
          list: [
            {
              code:'bbc',
              name:'B'
            },
            {
              code:'xyz',
              name:'C'
            },
            {
              code:'wsx',
              name:'D'
            }
          ]
        })
    
    }*/


    render(){

        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1
            }
        };

        //`https://www.youtube.com/embed/${this.state.videoId}`
        //<iframe id='YTplayer' src={`https://www.youtube.com/embed/${this.state.videoId}`} allowFullScreen title='Video player'/>

        return (
            <div>
                {!this.state.hasVideo && (<div>No Current Playing</div>)}
                {this.state.hasVideo && (
                <div className="player-section">
                    <div>
                        <YouTube
                            videoId={this.state.videoId}
                            opts={opts}
                            onReady={this.onReady}
                            onEnd={this.onEnd}
                        />
                    </div>
                    <p>{this.props.video.snippet.title}</p>
                </div>)}
            </div>
    
        )
    }

}

export default Player;