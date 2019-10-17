import React from 'react';
import Video from './Video';

const VideoList = ({videos , selectHandler}) => {
    
    const videoList =  videos.map((video) => {
        return(
            <Video key={video.id.videoId} video={video} selectHandler={selectHandler} />
        ); 
    });

    return(
        <div>
            {videoList}
        </div>
    );
};
export default VideoList;