import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <h1 className="text-center">About WeDJ</h1>
                    <p>WeDJ is a website that allows multiple users to choose their favorite songs and collaborate on which song 
                        should be played next. The first song submitted is the one that starts playing with its YouTube video 
                        displayed on the screen. The songs that are submitted afterwards are queued. If users, that are currently 
                        on the website, do not like the upcoming song, then they are able to  “downvote” it and the song will move 
                        down. The more dislikes a song gets, the deeper on the queue the song moves. Alternatively, if the last 
                        submitted song on the queue is upvoted by a majority of the people in the “party”, then it will move up. 
                        If it has more likes than the song in line above it, it will switch places with the latter and so on until 
                        it gets to the front of the queue. </p>
                <h1 className="text-center">About This Project</h1>
                    <p>This is a web design project under the instruction of 
                        <a href="https://cunytechprep.nyc/" target="_blank"> Cuny Tech Prep</a></p>
                <h1 className="text-center">About Us</h1>
                    <div className="text-center">
                        <p>Team Members: </p>
                        <ul>
                            <li><h4>Marco Valero</h4></li>
                            <li><h4>Anthony Zamora</h4></li>
                            <li><h4>Runmin Lin</h4></li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <Link to="/">
                            <button className="btn btn-info">Back</button>
                        </Link>
                    </div>
            </div>
        )
    }
}
