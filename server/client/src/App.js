import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import GuestPage from "./pages/GuestPage";
import AboutPage from "./pages/AboutPage";

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/guest/:id" component={GuestPage} />
            <Route path="/admin/:id" component={AdminPage} />
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;