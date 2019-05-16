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
    
    
    // RequestAPI('/sign-up', 'POST', { fname, name, email, password, birthdate, avatar, gender, city, interestedBy })
    //     .then(response => {
    //
    //     })
};

export { login, register };