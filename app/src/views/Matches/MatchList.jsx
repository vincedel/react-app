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

class MatchList extends React.Component {
    componentDidMount() {
        this.props.getMatches();
    }

    render() {
        const { classes, ...rest } = this.props;

        let matches = this.props.matches;

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
                        <MatchListItem matches={matches}/>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

class MatchListItem extends React.Component {
    render() {
        let list = this.props.matches.map((match) =>
            <MatchItem match={match}/>
        );

        return (
            <ul>
                {list}
            </ul>
        )
    }
}

class MatchItem extends React.Component {
    render() {
        let match = this.props.match;

        return (
            <li>
                <div>
                    <img src={match.user.avatar}/>
                </div>
                <div>
                    <span>{match.user.fname} {match.user.name}</span>
                </div>
                <div>
                    <span>
                        {match.date}
                    </span>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => ({
    matches: state.matches
});

const mapDispatchToProps = (dispatch) => ({
    getMatches: actions.getMatches(dispatch),
});

const container = connect(mapStateToProps, mapDispatchToProps)(MatchList);

export default withStyles(moviePageStyle)(container);