import React from "react";
import { Redirect } from 'react-router-dom'
export default class ProtectedRoute extends React.Component{
    isAuthenticated() {
        return false;
    }

    render() {
        return (
            this.isAuthenticated() === true
                ? this.props.component
                : <Redirect to="/login" />
        );
    }
}