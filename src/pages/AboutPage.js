import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <div className="text-center">
                    <h1>This is about page</h1>
                    <Link to="/">
                        <button className="btn btn-info">Back</button>
                    </Link>
                </div>
            </div>
        )
    }
}
