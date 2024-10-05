class LoginError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401
        this.Name = "LoginError"
    }
}

export default LoginError;