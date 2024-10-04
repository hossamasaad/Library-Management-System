class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404
        this.Name = "NotFoundName"
    }
}

export default NotFoundError;