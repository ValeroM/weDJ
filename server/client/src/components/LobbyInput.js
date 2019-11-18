import React from 'react';
import '../App.css';

class LobbyInput extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            lobbies: [],
            value: ''
        }
    
        this.props.hideButton.bind(this)
        this.props.redirect.bind(this)
    }

    handleChange = (event) => {
        
        this.setState({
            value: event.target.value
            });
    }

    handleSubmit = async (event) => {

        event.preventDefault();

        let found = false;
        let code = this.state.value;
        
        const response = await fetch('http://localhost:7001/api/lobbies'
        )
            .then(response => 
                response.json()
            )
            .then(data => {
                this.setState({
                    lobbies: data
                })
            }).catch( err =>{
                alert('Fail to join a party this may due to invaild party code, please try again!')
            });

            let tempary = this.state.lobbies;

            for( let i = 0; i < tempary.length; i++ ){
                if( tempary[i].lobby_code === code ){
                    found = true;
                    break;
                }
            }

            if( found ){
                if( window.confirm("Party found! Would you like to join now?") ){
                    this.props.hideButton();
                    this.props.redirect(code);
                }
            }
            else {
                alert('We are sorry, but we could not found the party with the code you have submitted, please try again!')
            }
    }

    render(){
        return(
            <div className='text-center'>
               <form className='Home-submit' onSubmit={this.handleSubmit}>
                    <label>
                        LobbyId:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default LobbyInput;