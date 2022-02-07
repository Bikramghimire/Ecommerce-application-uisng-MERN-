const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route imports
const productRoute = require("./routes/productRoute");

app.use("/api/v1/product", productRoute);
//middleware for Errors
app.use(errorMiddleware);

module.exports = app;
