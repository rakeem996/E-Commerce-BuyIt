const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


//handling uncaught exception erro
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception error");
    process.exit(1);
})


//config---------------

dotenv.config({path:"backend/config/config.env"});

//database-------------

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is up and running on http://localhost:${process.env.PORT}`);
})

//unhandled promise rejection-----

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise`);
    server.close(() => {
        process.exit(1);
    })
})