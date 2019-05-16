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
    }
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
        default:
            return state
    }
}