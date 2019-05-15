import React from "react";
import {Redirect, Route} from 'react-router-dom'
import isAuthenticated from './Security'
export default class ProtectedRoute extends React.Component{
    render() {
        return (
            isAuthenticated() === true
                ? <Route path={this.props.path} component={this.props.component} />
                : <Redirect to="/login" />
        );
    }
}