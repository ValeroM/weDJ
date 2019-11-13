import React from 'react';
import '../App.css';

class LobbyInput extends React.Component {

    state = {
        value: ''
    }

    handleChange = (event) => {
        
        this.setState({
            value: event.target.value
            });
    }

    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
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