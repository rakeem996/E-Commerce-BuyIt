const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());

//route imports
const product = require('./Routes/productRoute');
const user = require("./Routes/userRoutes");

app.use("/api/v1",user);
app.use("/api/v1",product);

module.exports = app;

//middleware  for errors

app.use(errorMiddleware);
module.exports = app;
 