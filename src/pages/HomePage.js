import React from 'react';
import '../App.css';

export default class HomePage extends React.Component {
    render(){
        return (
          <div className="App">
            <h1>WeDJ!</h1>
            <h2>Some cool and dope lines here</h2>
            <button className="btn btn-outline-danger">Party Up</button>
            <br/>
            <button className="btn btn-outline-success">Guest Login</button>
            <br/>
            <button className="btn btn-outline-info">About Us</button>
          </div>
        );
      }
}