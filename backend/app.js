const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

//Route imports
const products = require("./routes/productRoute");
const users = require("./routes/userRoute");


app.use("/api/v1",products);
app.use("/api/v1",users);

//Error Handler
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;