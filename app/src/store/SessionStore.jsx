const initialState = {
    user: null,
    loginPage: {
        displayError: false,
        errorMessage: '',
    }
};

export default (state = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('error login');
            newState.loginPage.errorMessage = action.payload.errorMessage;
            newState.loginPage.displayError = true;
            return newState;

        case 'LOGIN_SUCCESS':
            newState.user = action.payload.user;
            newState.loginPage.errorMessage = '';
            newState.loginPage.displayError = false;
            return newState;

        case 'SIGN_UP':
            // return state.concat([action.text]);
        default:
            return state
    }
}