const initialState = {
    user: typeof sessionStorage.getItem('user') !== "undefined"
        ? JSON.parse(sessionStorage.getItem('user'))
        : null
    ,
    loginPage: {
        displayError: false,
        errorMessage: '',
    },
    registerPage: {
        displayError: false,
        errorMessage: '',
        redirect: false
    },
    movies: [],
    movie: {
        poster: '',
        title: '',
        description: '',
        types: [],
        year: ''
    },
    movieStatus: {
        movie: 0,
        user: '',
        liked: null
    },
    users: [
        {
            avatar: '',
            fname: '',
            name: ''
        }
    ],
    matches: []
};

export default (state = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'LOGIN_ERROR':
            newState.loginPage.errorMessage = action.payload.errorMessage;
            newState.loginPage.displayError = true;
            return newState;

        case 'SIGN_UP_ERROR':
            newState.registerPage.errorMessage = action.payload.errorMessage;
            newState.registerPage.displayError = true;
            return newState;

        case 'SIGN_UP_SUCCESS':
            newState.registerPage.redirect = true;
            return newState;

        case 'LOGIN_SUCCESS':
            newState.user = action.payload.user;
            newState.loginPage.errorMessage = '';
            newState.loginPage.displayError = false;
            sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            return newState;

        case 'LOGOUT':
            sessionStorage.removeItem('user');
            newState.user = null;
            return newState;

        case 'GET_MOVIES':
            newState.movies = action.payload.movies;
            return newState;

        case 'GET_MOVIE':
            newState.movie = action.payload.movie;
            return newState;

        case 'UPDATE_MOVIE_STATUS':
            newState.movieStatus = action.payload.movieStatus;
            return newState;

        case 'GET_USERS':
            newState.users = action.payload.users;
            return newState;

        case 'GET_MATCH':
            newState.matches = action.payload.matches;
            return newState;

        default:
            return state
    }
}