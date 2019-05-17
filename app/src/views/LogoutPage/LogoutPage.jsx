import React from 'react';
import actions from "../../store/actions";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class LogoutPage extends React.Component {
    render(){
        if (this.props.hasUser) {
            this.props.logout();
        }
        return <Redirect to="/login" />
    }
}

const mapStateToProps = (state) => ({
    hasUser: !!state.user
});

const mapDispatchToProps = (dispatch) => ({
    logout: actions.logout(dispatch)
});
const container = connect(mapStateToProps, mapDispatchToProps)(LogoutPage);

export default (container);
