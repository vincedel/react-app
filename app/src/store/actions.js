import RequestAPI from "./RequestAPI";

const login = (dispatch) => (email, password) => {
    RequestAPI('/login', 'POST', { email, password })
        .then(response => {
            const body = response.json();
            if (response.status !== 201) {
                return body.then(json => {
                    return dispatch({
                        type: "LOGIN_ERROR",
                        payload: {
                            errorMessage: json.detail
                        }
                    });
                });
            }

            return body.then(user => {
                return dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user
                    }
                });
            });
        });
};

const register = (dispatch) => (form) => {
    const { fname, name, email, password, repeatPassword, birthdate, avatar, gender, city, interestedBy } = form;
    let message = '';

    if (gender === '' || interestedBy === '') {
        message = "Veuillez renseigner votre sexe ainsi que le sexe pour lequel vous êtes attiré."
    } else if (password !== repeatPassword) {
        message = "Vos mot de passe ne sont pas identique"
    } else {
        RequestAPI('/sign-up', 'POST', { fname, name, email, password, birthdate, avatar, gender, city, interestedBy })
        .then(response => {
            const body = response.json();
            if (response.status !== 201) {
                return body.then(json => {
                    return dispatch({
                        type: "SIGN_UP_ERROR",
                        payload: {
                            errorMessage: json.detail
                        }
                    });
                });
            }
            return body.then(user => {
                return dispatch({
                    type: "SIGN_UP_SUCCESS"
                });
            });
        });
    }

    return dispatch({
        type: 'SIGN_UP_ERROR',
        payload: {
            errorMessage: message
        }
    })
};

const logout = (dispatch) => () => {
    return dispatch({
        type: "LOGOUT"
    });
};

const getMovies = (dispatch) => (s = null) => {
    let path = '/movies';

    if (s !== null) {
        path += '?s='+s;
    }

    RequestAPI(path, 'GET')
        .then(response => {
            const body = response.json();

            return body.then(movies => {
                return dispatch({
                    type: "GET_MOVIES",
                    payload: {
                        movies
                    }
                });
            });
        });
};

const getMovie = (dispatch) => (id) => {
    let path = '/movies/'+id;

    RequestAPI(path, 'GET')
        .then(response => {
            const body = response.json();

            return body.then(movie => {
                console.log(movie);
                return dispatch({
                    type: "GET_MOVIE",
                    payload: {
                        movie
                    }
                });
            });
        });
};

const changeMovieStatus = (dispatch) => (id, status, update = false) => {
    let path = '/movies/'+id+'/status';

    RequestAPI(path, update ? 'PUT' : 'POST', {liked: status})
        .then(response => {
            const body = response.json();

            return body.then(movieStatus => {

                return dispatch({
                    type: "UPDATE_MOVIE_STATUS",
                    payload: {
                        movieStatus
                    }
                });
            });
        });
};

const getMovieStatus = (dispatch) => (id) => {
    let path = '/movies/'+id+'/status';

    RequestAPI(path, 'GET')
        .then(response => {
            const body = response.json();

            return body.then(movieStatus => {

                return dispatch({
                    type: "UPDATE_MOVIE_STATUS",
                    payload: {
                        movieStatus
                    }
                });
            });
        });
};

const getUsers = (dispatch) => () => {
    RequestAPI('/users', 'GET')
        .then(response => {
            const body = response.json();

            return body.then(users => {

                return dispatch({
                    type: "GET_USERS",
                    payload: {
                        users
                    }
                });
            });
        });
};

const matchWithUser = (dispatch) => (id) => {
    RequestAPI('/user_matches', 'POST', {user: id})
        .then(response => {
            const body = response.json();

            return body.then(last_user_match => {

                return dispatch({
                    type: "MATCH_USER",
                    payload: {
                        last_user_match
                    }
                });
            });
        });
};

const getMatches = (dispatch) => (id) => {
    RequestAPI('/user_matches', 'GET')
        .then(response => {
            const body = response.json();

            return body.then(matches => {

                return dispatch({
                    type: "GET_MATCH",
                    payload: {
                        matches
                    }
                });
            });
        });
};


const actions = {
    login: login,
    getMovies: getMovies,
    getMovie: getMovie,
    changeMovieStatus: changeMovieStatus,
    getMovieStatus: getMovieStatus,
    getUsers: getUsers,
    matchWithUser: matchWithUser,
    getMatches: getMatches,
    register: register,
    logout: logout,
};

export default actions;
