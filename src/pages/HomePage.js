import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../App.css';
import logo from '../img/logo.png';

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
              <Link to="/admin">
                <button className="btn btn-danger">Party Up</button>
              </Link>
              <br/>
              <Link to="/guest">
                <button className="btn btn-success">Guest Login</button>
              </Link>
              <br/>
              <button className="btn btn-info">About Us</button>
              <br/><br/><br/><br/><br/>
          </div>
        );
      }
}