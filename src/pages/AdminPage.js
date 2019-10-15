import React from 'react';
import '../App.css';
import SongManage from "../components/SongManage";
import Player from "../components/Player";

export default class AdminPage extends React.Component{
    render(){
        return(
            <div>
                <div className="text-center">
                    <h2>Manage Your Party</h2>
                    <br/>
                    <Player />
                    <br/>
                    <SongManage />
                </div>
            </div>
        )
    }
}