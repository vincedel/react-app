import RequestAPI from './RequestAPI'

export default (state = [], action) => {
    switch (action.type) {
        case 'LOGIN':
            return RequestAPI('/movies', 'GET')
            .then(json => {
                if (json.status === 201) {
                    json.json().then(user => {
                        sessionStorage.setItem('user', JSON.stringify(user));
                        console.log(sessionStorage.getItem('user'));
                    });
                }
            });
        case 'SIGN_UP':
            // return state.concat([action.text]);
        default:
            return state
    }
}