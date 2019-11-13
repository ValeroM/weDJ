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

        this.randstr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    handleChange = (event) => {
        
        this.setState({
            value: event.target.value
            });
    }

    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        this.props.hideButton();
        this.props.redirect(this.randstr)
        event.preventDefault();
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