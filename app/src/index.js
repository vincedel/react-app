import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./assets/scss/material-kit-react.scss";

import ProtectedRoute from './security/ProtectedRoute'

// pages for this product
import Components from "./views/Components/Components.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";
import ProfilePage from "./views/ProfilePage/ProfilePage.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <ProtectedRoute path="/profile-page" component={ProfilePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
