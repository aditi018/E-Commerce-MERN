const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Cannot exceed more than this"],
        minLength:[2,"Name must be atleast 3 letters long"]
    },
    email:{
        type:String,
        required:[true,"Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Enter Your Password"],
        minLength:[8,"Password should be 8 characters long"],
        select:false,
        
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});


//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// Compare Password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // console.log("Hello...");
    //Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // console.log("Token reset...");
    //Hashing and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
    // console.log("Got reset token...")
    this.resetPasswordExpire = Date.now()+15 *60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema);