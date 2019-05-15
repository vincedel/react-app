import RequestAPI from './RequestAPI'
import ReactDOM from "react-dom";
import React from "react";

export default (state = [], action) => {
    switch (action.type) {
        case 'LOGIN':
            let email = action.component.state.form.email;
            let password = action.component.state.form.password;
            let component = action.component;
            return RequestAPI('/login', 'POST', {email: email, password: password})
            .then(json => {
                if (json.status === 201) {
                    json.json().then(user => {
                        sessionStorage.setItem('user', JSON.stringify(user));
                        component.setState({
                            ...component.state,
                            redirect: true
                        });
                    });
                } else {
                    json.json().then(error => {
                        console.log(error.detail);
                        component.setState({
                            ...component.state,
                            displayError: true,
                            errorMessage: error.detail
                        });
                    });
                }
            });
        case 'SIGN_UP':
            // return state.concat([action.text]);
        default:
            return state
    }
}