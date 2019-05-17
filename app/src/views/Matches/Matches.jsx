import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "./../../components/Header/Header.jsx";
import Footer from "./../../components/Footer/Footer.jsx";
import HeaderLinks from "./../../components/Header/HeaderLinks.jsx";
import Parallax from "./../../components/Parallax/Parallax.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";

import actions from '../../store/actions';

import moviePageStyle from "./../../assets/jss/material-kit-react/views/movies.jsx";
import connect from "../../../node_modules/react-redux/es/connect/connect";

class Matches extends React.Component {

    state = {index:0}

    componentDidMount() {
        this.props.getUsers();
    }

    onLikeClick = (e) => {
        this.props.matchWithUser(this.props.users[this.state.index].id);
        this.setState({index: this.state.index+1});
    };

    onDislikeClick = (e) => this.setState({index: this.state.index+1});


    render() {
        const { classes, ...rest } = this.props;

        let user = this.props.users[this.state.index];

        return (
            <div>
                <Header
                    color="transparent"
                    brand="Material Kit React"
                    rightLinks={<HeaderLinks />}
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "white"
                    }}
                    {...rest}
                />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <img src={user.avatar}/>
                        <span>{user.fname} {user.name}</span>
                        <Button color="success" onClick={this.onLikeClick}>J'aime</Button>
                        <Button color="danger" onClick={this.onDislikeClick}>Je n'aime pas</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: actions.getUsers(dispatch),
    matchWithUser: actions.matchWithUser(dispatch),
});

const container = connect(mapStateToProps, mapDispatchToProps)(Matches);

export default withStyles(moviePageStyle)(container);