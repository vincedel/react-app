import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'

import "./assets/scss/material-kit-react.scss";

import ProtectedRoute from './security/ProtectedRoute'
import Store from './store/Store'

// pages for this product
import Matches from "./views/Matches/Matches.jsx";
import MatchList from "./views/Matches/MatchList.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";
import ProfilePage from "./views/ProfilePage/ProfilePage.jsx";
import LoginPage from "./views/LoginPage/LoginPage.jsx";
import LogoutPage from "./views/LogoutPage/LogoutPage.jsx";
import RegisterPage from "./views/RegisterPage/RegisterPage.jsx";
import Movies from "./views/Movies/Movies.jsx";
import MovieItem from "./views/Movies/MovieItem.jsx";

const hist = createBrowserHistory();

const App = () => (
    <Provider store={Store}>
        <Router history={hist}>
            <Switch>
                <ProtectedRoute path="/landing-page" component={LandingPage} />
                <ProtectedRoute path="/profile-page" component={ProfilePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage} />
                <Route path="/register-page" component={RegisterPage} />
                <ProtectedRoute path="/movies/:id" component={MovieItem} />
                <ProtectedRoute path="/movies" component={Movies} />
                <ProtectedRoute path="/matches" component={MatchList} />
                <ProtectedRoute path="/" component={Matches} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
