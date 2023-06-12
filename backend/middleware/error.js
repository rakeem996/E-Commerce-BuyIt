const ErrorHandler = require('../Utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //wrong Mongodb ID error
    if(err.name == "CastError") {
        const message = `Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message,404);
        // console.log(err);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}