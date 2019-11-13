import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import GuestPage from "./pages/GuestPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/guest/:id">
            <GuestPage />
          </Route>
          <Route path="/admin/:id">
            <AdminPage />
          </Route>
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