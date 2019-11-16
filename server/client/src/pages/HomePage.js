import React from 'react';
import { Link, withRouter } from "react-router-dom";
import '../App.css';
import logo from '../img/logo.png';
import LobbyInput from '../components/LobbyInput';
import CreateForm from '../components/CreateForm';

class HomePage extends React.Component {

    state = {
      showCreate: false
    }

    clickHandler = () => {
      this.setState({
        showCreate: !this.state.showCreate
      })
    }

    adminredirect = (id) => {
      this.props.history.push(`/admin/${id}`);
    }

    guestredirect = (id) => {
      this.props.history.push(`/guest/${id}`);
    }

    test = async() => {
      const response = await fetch('http://localhost:7001/api/songs'
        )
            .then(response => 
                response.json()
            )
            .then(data => 
                /*this.setState({
                    data
                })*/
                console.log(data)
            );
    }

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
              {!this.state.showCreate && (<button className="btn btn-danger" onClick={this.clickHandler}>Create Your Party</button>)}
              {this.state.showCreate && (<CreateForm hideButton={this.clickHandler} redirect={this.adminredirect}/>)}
              <br/>
              <Link to="/guest">
                <button className="btn btn-success">Guest Login</button>
              </Link>
              <br/>
              <Link to="/about">
                <button className="btn btn-info">About Us</button>
              </Link>
              <br/>
              <button onClick={this.test}>Test-BackEnd</button>
              <br/><br/><br/>
          </div>
        );
      }
}

export default withRouter(HomePage);