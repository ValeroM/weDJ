import React from 'react';
import { Link, withRouter } from "react-router-dom";
import '../App.css';
import logo from '../img/logo.png';
import LobbyInput from '../components/LobbyInput';
import CreateForm from '../components/CreateForm';

class HomePage extends React.Component {

    state = {
      showCreate: false,
      showJoin: false
    }

    createHandler = () => {
      this.setState({
        showCreate: !this.state.showCreate
      })
    }

    joinHandler = () => {
      this.setState({
        showJoin: !this.state.showJoin
      })
    }

    adminredirect = (id) => {
      this.props.history.push(`/admin/${id}`);
    }

    guestredirect = (id) => {
      this.props.history.push(`/guest/${id}`);
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
              {!this.state.showCreate && (<button className="btn btn-danger" onClick={this.createHandler}>Create Your Party</button>)}
              {this.state.showCreate && (<CreateForm hideButton={this.createHandler} redirect={this.adminredirect}/>)}
              <br/>
              {!this.state.showJoin && (<button className="btn btn-success" onClick={this.joinHandler}>Join a Party</button>)}
              {this.state.showJoin && (<LobbyInput hideButton={this.joinHandler} redirect={this.guestredirect}/>)}
              <br/>
              <Link to="/about">
                <button className="btn btn-info">About Us</button>
              </Link>
              <br/>
              <br/><br/><br/>
          </div>
        );
      }
}

export default withRouter(HomePage);