import React from 'react';

class SearchBar extends React.Component {

    render(){
        return(
            <div className="text-center">
                <input type="text" style={{width:"25%", height:"35px"}} placeholder="Search..."/>
                <br/>
            </div>
        )
    }
}

export default SearchBar;