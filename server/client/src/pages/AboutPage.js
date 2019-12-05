import React from 'react';
import { Link } from "react-router-dom";

export default class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <h1 className="text-center">About WeDJ</h1>
                    <p>
                        A party DJ can be extremely expensive, depending on the occasion and its duration. 
                        A wedding DJ, for instance, can cost about $400 per hour or $1,200 in total. 
                        Please keep in mind, DJs have a predetermined playlist that automatically plays the next song, so they just need to press the Play button. 
                        Unfortunately, party guests are not allowed to voice their opinion about the music. 
                        However, weDJ tackles this issue and offers a voice to all party guests.<br/>

                        <br/>weDJ is a web application that allows party guests to submit a song request without any payment. 
                        When a song is submitted, other guests can either like or dislike the song. 
                        Depending on the song’s votes, it can either be moved up or down in the queue. 
                        Songs with the highest vote will have a higher priority to be played next, and vice versa. 
                        The choice is yours!<br/>

                        <br/>The creators of weDJ strongly believe that a music playlist should not be biased, but collaborative. 
                        Let others share their taste in music and, possibly, introduce you to a new genre for your music player.<br/>
                    </p>
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
