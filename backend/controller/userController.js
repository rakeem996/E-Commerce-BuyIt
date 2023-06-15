const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require('../Models/userModels');

//Register a user

exports.registerUser = catchAsyncErrors(async(req,res,next) => {
    
    const {name, email, password } = req.body;

    const user = await User.create({
        name,email,password,
        avatar: {
            public_id:"this is a sample id",
            url: "profile pic"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });
});

//Login user
exports.loginUser = catchAsyncErrors(async(req,res,next) => {

    const {email,password} = req.body;

    //checking if we received both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email Or Password",400));
    }

    //finding the email from the DB and checking if the password matches

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    //if the password does not match
    const isPasswordMatched = user.comparePassword(password);
    console.log(isPasswordMatched);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }


    //if the password matches
    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });

})