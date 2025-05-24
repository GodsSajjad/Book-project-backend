export default class AppError extends Error {
    constructor(message, StatusCode) {
        super(message);
        this.StatusCode = StatusCode;
        this.Status = `${StatusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperitional = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
