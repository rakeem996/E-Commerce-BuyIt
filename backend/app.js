const express = require('express');

const app = express();

const errorMIddleware = require('./middleware/error');

app.use(express.json());

//route imports
const product = require('./Routes/productRoute')

app.use("/api/v1",product);

module.exports = app;

//middleware  for errors

app.use(errorMIddleware);
module.exports = app;
 