import React from 'react';

class Searchbar extends React.Component {
    state = {
        term: ''
    };

    inputHandler = (event) => {
        this.setState({
            term: event.target.value
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.submitBack(this.state.term);
    }

    render() {
        return (
            <div className='text-center'>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label htmlFor="searchVideo">Video Search</label>
                        <input onChange={this.inputHandler} name='searchVideo' type="text" value={this.state.term}
                            placeholder='Search...'/>
                        <button className="btn btn-info">Search</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Searchbar;