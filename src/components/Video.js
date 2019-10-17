import React from 'react';

const Video = ({video , selectHandler}) => {
    return (
        <div onClick={ () => selectHandler(video) }>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>
                <span>{video.snippet.title}</span>
            </div>
        </div>
    )
};
export default Video;