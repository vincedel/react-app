import React from "react";
import {Redirect, Route} from 'react-router-dom'
import {connect} from "react-redux";
class ProtectedRoute extends React.Component{
    render() {
        return (
             this.props.user !== null
                ? <Route path={this.props.path} component={this.props.component} />
                : <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({});

const container = connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

export default (container);