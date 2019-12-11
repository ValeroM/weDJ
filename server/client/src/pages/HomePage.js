import React from 'react';
import { Link, withRouter } from "react-router-dom";
import '../App.css';
import logo from '../img/logo.png';
import LobbyInput from '../components/LobbyInput';
import CreateForm from '../components/CreateForm';
import Footer from '../components/Footer';

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
          <div>
          <div className="App App-bg">
              <img src={logo} alt="logo"></img>
              <br/>
              <br/>
              <h1 className="App-header">Rock your party your way!</h1>
              <br/>
              <br/>
              <div>
                {!this.state.showCreate && (<button className="btn btn-danger" onClick={this.createHandler}>Create Your Party</button>)}
                {this.state.showCreate && (<CreateForm hideButton={this.createHandler} redirect={this.adminredirect}/>)}
              </div>
              <div>
                {!this.state.showJoin && (<button className="btn btn-success" onClick={this.joinHandler}>Join a Party</button>)}
                {this.state.showJoin && (<LobbyInput hideButton={this.joinHandler} redirect={this.guestredirect}/>)}
              </div>
              <div>
                <Link to="/about">
                  <button className="btn btn-info">About Us</button>
                </Link>
              </div>
              <br/><br/><br/><br/>
          </div>
            <Footer />
          </div>
        );
      }
}

export default withRouter(HomePage);