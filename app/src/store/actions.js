export function login (email, password) {
    return ({
        type: "LOGIN",
        email,
        password
    })
}