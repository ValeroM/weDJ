import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import GuestPage from "./pages/GuestPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/guest">
            <GuestPage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}