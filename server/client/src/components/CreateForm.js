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
        alert('Your party is created! Enjoy!');
        this.props.hideButton();
        event.preventDefault();
        
        let name = this.state.value;

        /*const res = await fetch('http://localhost:7001/api/lobbies', {
                mode: 'no-cors',
                method: 'POST',
                body: JSON.stringify({
                    name: name
                })
            }).then( response=>
                response.json()).then( data => 
                    console.log(data));*/
        const response = await fetch('http://localhost:7001/api/lobbies');
        const myJson = await response.json();
        console.log(JSON.stringify(myJson));
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