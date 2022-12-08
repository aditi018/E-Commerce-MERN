const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

//Register User

exports.registerUser = catchAsyncError(async(req,res)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"SampleidFor avatar",
            url:"sample URL"
        }
    });

    sendToken(user,201,res);
});


//Login User
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    //Checking user has given email and password
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }

    const user =await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);
});

//Logout User
exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
});

//Forgot password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    // console.log("User found!!");
    //Get resetPasswordToken
    const resetToken = user.getResetPasswordToken();
    // console.log("Function called...");

   await user.save({validateBeforeSave: false});

   const resetPasswordURL = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;


   const message = `Your password reset token is :- \n\n ${resetPasswordURL} \n\n If you have not requested this email then, please ignore it.`;

//    console.log(message);

   try{

    await sendEmail({
        email : user.email,
        subject : `Ecommerce Password Recovery`,
        message,
    });
    res.status(200).json({
        succcess:true,
        message: ` Email sent to ${user.email} successfully...`
    })

   }catch(err){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});

    return next(new ErrorHandler(err.message,500));
   }

});


//Reset Password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt : Date.now()}
    });
    
    if(!user){
        return next(new ErrorHandler("Reset Password Token is Invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
       return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
})