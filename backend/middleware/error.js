const ErrorHandler = require('../Utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //wrong Mongodb ID error
    if(err.name == "CastError") {
        const message = `Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message,404);
    }

    //Duplicate key entered error
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }

    //wrong JWT error
    if(err.name == "JsonWebTokenError") {
        const message = `Json web Token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    //JWT expire
    if(err.name == "TokenExpireError") {
        const message = `Json web token is Expired Try again `;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}