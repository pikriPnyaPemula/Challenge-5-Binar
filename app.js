require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT = 3000 } = process.env;
const endpointV1 = require ('./routes/endpointV1');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', endpointV1);

// 404 Error Handling
app.use ((req, res, next) => {
    res.status(404).json ({
        status: false,
        message: 'Not Found',
        data: null
    });
});

// 500 Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json ({
        status: false,
        message: 'Internal Server Error',
        data: err.message
    });
});

const authRouter = require('./routes/auth.routes');
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () =>
console.log('Listening on port ', PORT));