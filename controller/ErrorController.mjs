function sendDevelop(err, res) {
    return res.status(err.StatusCode ? err.StatusCode : 401).json({
        error: err,
        Status: err.Status,
        message: err.message,
    });
}
function sendProd(err, res) {
    if (err.isOperitional) {
        return res.status(err.StatusCode ? err.StatusCode : 401).json({
            message: err.message,
        });
    }

    return res.status(501).json({
        message: "server Error",
    });
}
export default function ErrorController(err, req, res, next) {
    // console.log(err);
    const Info = process.env.NODE_INFO;
    if (Info?.trim() === "development") {
        return next(sendDevelop(err, res));
    }
    if (Info?.trim() === "prodoction") {
        const error = { ...err, message: err.message };
        // در اینچا میتوانید ارور های سفارشی را هندل کنید
        return next(sendProd(error, res));
    }
}
