export default (url, method, params = null) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (sessionStorage.getItem('user') != null) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (typeof user.token !== 'undefined') {
            headers['X-AUTH-TOKEN'] = user.token;
        }
    }
    return fetch("http://api-react.valentin-lacour.pro"+url, {
        method: method,
        headers: headers,
        body: params !== null ? JSON.stringify(params) : null
    })
}