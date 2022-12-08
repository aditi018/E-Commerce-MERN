const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});


//Handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shuttting down the server due to uncaught exception.`)
})


const connectDB = require("./config/database");
connectDB();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server running on https://localhost:${process.env.PORT}`);
})


//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection.`);

    server.close(()=>{
        process.exit();
    })
})