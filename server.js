//!internal
const express = require('express');
const dotenv = require('dotenv')
//!external
const connectDB = require('./db');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);
dotenv.config();



//! global error handler
app.use((err, req, res, next) => {
    console.log(err.message)
    const message = err.message ? err.message : 'internal server error occurred';
    const status = err.status ? err.status : 500
    res.status(status).json({msg: message});
});


//!connect database and run the local server
connectDB('mongodb://localhost:27017/test')
.then(() => {
    console.log('Database is connected✔')
    app.listen(8000, () => {
        console.log(`APPLICATION IS RUNNING😎`);
    });
})
.catch((e) => {
    console.log(e);
});

