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

export default login;