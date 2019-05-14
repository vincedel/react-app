import React from "react";
import { Redirect } from 'react-router-dom'
export default class ProtectedRoute extends React.Component{
    isAuthenticated() {
        if (sessionStorage.getItem('user') != null) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            console.log(user);
            if (typeof user.token !== 'undefined') {
                return true;
            }
        }
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