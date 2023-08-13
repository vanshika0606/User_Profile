const express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const user = require('./routers/userRoutes');


app.use('/api', user);

module.exports = app;