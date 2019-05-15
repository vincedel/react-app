export default () => {
    if (sessionStorage.getItem('user') != null) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (typeof user.token !== 'undefined') {
            return true;
        }
    }
    return false;
}