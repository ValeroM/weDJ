import React from 'react';
import '../App.css';
import SongList from "../components/SongList";
import SearchBar from "../components/SearchBar";

export default class AdminPage extends React.Component{
    render(){
        return(
            <div>
                <h1>Hi! I'm Guest Page</h1>
                <SearchBar />
                <SongList />
            </div>
        )
    }
}