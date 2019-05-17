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
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";

import actions from '../../store/actions';

import moviePageStyle from "./../../assets/jss/material-kit-react/views/movies.jsx";
import connect from "../../../node_modules/react-redux/es/connect/connect";

class Movies extends React.Component {
    componentDidMount() {
        this.props.getMovies();
    }

    onSearchKeyUp = (e) => this.props.getMovies(e.target.value);

    render() {
        const { classes, ...rest } = this.props;

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
                <div className="search-bar-parallax">
                    <CustomInput
                        id="regular"
                        inputProps={{
                            placeholder: "Rechercher un film",
                            onKeyUp: this.onSearchKeyUp
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </div>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <MovieList movies={this.props.movies}/>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

class MovieComponent extends React.Component {
    render() {
        let movie = this.props.movie;
        return (
            <GridItem xs={12} sm={12} md={2}>
                <a href={'/movies/'+movie.id}>
                    <div>
                        <div className="movie_list-item-img">
                            <img src={movie.poster}/>
                        </div>
                        <span className="movie_list-item-title">{movie.title}</span>
                    </div>
                </a>
            </GridItem>
        );
    }
}

class MovieList extends React.Component {
    render() {
        let movieList = this.props.movies.map((movie) =>
            <MovieComponent movie={movie}/>
        );

        return (
            <GridContainer justify="center">{movieList}</GridContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    movies: state.movies,
    hasMovies: !!state.movies
});

const mapDispatchToProps = (dispatch) => ({
    getMovies: actions.getMovies(dispatch)
});

const container = connect(mapStateToProps, mapDispatchToProps)(Movies);

export default withStyles(moviePageStyle)(container);