import React from 'react';

class Footer extends React.Component {
    render() {

        const style = {
            backgroundColor: "#F8F8F8",
            borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            paddingTop: '5px',
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "30px",
            width: "100%",
        };

        return(
            <div style={style}>
                <p>&copy; WeDJ 2019</p>
            </div>
        )
    }
}

export default Footer