const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true,
    },
    description:{
        type:String,
        required:["true","Please Enter Product Price"],
    },
    price:{
        type:Number,
        required:[true,"Please enter price"],
        maxLength:[8,"Price cannot exceed 8 figures"],
    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
        {
            publicId:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"],
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1,
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            review:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }
});

module.exports =mongoose.model("Product",productSchema);