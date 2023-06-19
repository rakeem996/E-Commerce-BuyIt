const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require('../Models/userModels');
const sendToken = require("../Utils/jwtToken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

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

    sendToken(user,201,res);

});

//Login user
exports.loginUser = catchAsyncErrors(async(req,res,next) => {

    const {email,password} = req.body;

    //checking if we received both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    //finding the email from the DB and checking if the password matches

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    //if the password does not match
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }


    //if the password matches
    sendToken(user,200,res);

});

//Logout user

exports.logoutUser = catchAsyncErrors( async (req,res,next) => {
    
    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "user Logged Out"
    });
})

//forget password

exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {

    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
 
    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordURL} \n\n If you have not requested this mail then, please ignore it. `

    try {
        await sendEmail({
            email: user.email,
            subject: `BuyIt password recovery`,
            message
        });

        res.status(200).json({
            success: true,
            messsage:`Email sent to ${user.email} successfully`,
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
        
    }
})

//Reset password
exports.resetPassword = catchAsyncErrors(async (req,res,next) => {

    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    //using hashed token finding the user

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password ;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendToken(user, 200, res)


})