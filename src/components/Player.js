import React from 'react';

const Player = ( {video} ) => {
    
    if( !video ) {
        return( 
            <div>No Current Playing</div> 
        );
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <div>
            <div>
                <iframe src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div>
                <p>{video.snippet.title}</p>
            </div>
        </div>

    )
}

export default Player;