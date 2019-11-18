import React from 'react';
import '../App.css';

class CreateForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
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
        
        const name = this.state.value;

        const res = await fetch('http://localhost:7001/api/lobbies', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name": name
                })
            })
            .then( response=>
                response.json()
                )
                .then( data =>{
                        alert('Your party is created! Enjoy!');
                        this.props.hideButton();
                        this.props.redirect(data.lobby_code);}
                    )
                    .catch( err =>{
                        alert('Fail to create your party this may due to invaild party name, please try again!')
                    });

    }

    render(){
        return(
            <div className='text-center'>
               <form className='Home-submit' onSubmit={this.handleSubmit}>
                    <label>
                        Party Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CreateForm;