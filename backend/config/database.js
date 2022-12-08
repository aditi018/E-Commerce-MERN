const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});


const connectDb = ()=>{
    mongoose.connect(process.env.MONGOURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((data)=>{
        console.log(`Connected to DB with server: ${data.connection.host}`);
    })
}

module.exports = connectDb;