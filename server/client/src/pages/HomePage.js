import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import logo from '../img/logo.png';
import LobbyInput from '../components/LobbyInput';

export default class HomePage extends React.Component {
    render(){
        return (
          <div className="App App-bg">
              <img src={logo} alt="logo"></img>
              <br/>
              <br/>
              <h1 className="App-header">Rock your party your way!</h1>
              <br/>
              <br/>
              <LobbyInput />
              <br/>
              <Link to="/admin">
                <button className="btn btn-danger">Create Your Party</button>
              </Link>
              <br/>
              <Link to="/guest">
                <button className="btn btn-success">Guest Login</button>
              </Link>
              <br/>
              <Link to="/about">
                <button className="btn btn-info">About Us</button>
              </Link>
              <br/><br/><br/><br/><br/>
          </div>
        );
      }
}