import React from 'react';
import '../style/videos.css';

const Player = ( {video} ) => {
    
    if( !video ) {
        return( 
            <div>No Current Playing</div> 
        );
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <div className="player-section">
            <div>
                <iframe id='YTplayer' src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <p>{video.snippet.title}</p>
        </div>

    )
}

export default Player;