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

class MovieItem extends React.Component {
    componentDidMount() {
        this.props.getMovie(this.props.match.params.id);
        //this.props.getMovieStatus(this.props.match.params.id);
    }

    onLikeClick = (e) => this.props.changeMovieStatus(this.props.movie.id, true, this.props.movieStatus.liked !== null);

    onDislikeClick = (e) => this.props.changeMovieStatus(this.props.movie.id, false, this.props.movieStatus.liked !== null);

    render() {
        const { classes, ...rest } = this.props;

        let movie = this.props.movie;

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
                <Parallax small filter image={require("./../../assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <img src={movie.poster}/>
                        <h1>{movie.title}</h1>
                        <span>{movie.year}</span>
                        <p>{movie.description}</p>
                        <MovieTypeList types={movie.types}/>
                        <Button color="success" onClick={this.onLikeClick} disabled={this.props.movieStatus.liked === true}>J'aime</Button>
                        <Button color="danger" onClick={this.onDislikeClick} disabled={this.props.movieStatus.liked === false}>Je n'aime pas</Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

class MovieTypeList extends React.Component {
    render() {
        let movieTypeList = this.props.types.map((type) =>
            <MovieType label={type}/>
        );

        return (
            <ul>{movieTypeList}</ul>
        )
    }
}

class MovieType extends React.Component {
    render() {
        return (
            <li>{this.props.label}</li>
        );
    }
}

const mapStateToProps = (state) => ({
    movie: state.movie,
    hasMovie: !!state.movie,
    movieStatus: state.movieStatus
});

const mapDispatchToProps = (dispatch) => ({
    getMovie: actions.getMovie(dispatch),
    changeMovieStatus: actions.changeMovieStatus(dispatch),
    getMovieStatus: actions.getMovieStatus(dispatch),
});

const container = connect(mapStateToProps, mapDispatchToProps)(MovieItem);

export default withStyles(moviePageStyle)(container);