import React from 'react';
import Card from 'react-bootstrap/Card';
import '../style/videos.css';

const Video = ({video , selectHandler}) => {
    return (
        <span className="searchedVideo">
            <Card onClick={ () => selectHandler(video) }>
                <Card.Img variant="top" src={video.snippet.thumbnails.medium.url} />
                <Card.Body>
                    <Card.Text>{video.snippet.title}</Card.Text>
                </Card.Body>
            </Card>
        </span>
    )
};
export default Video;