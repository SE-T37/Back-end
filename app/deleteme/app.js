require('dotenv').config(); 

const express = require('express');
const app = express();
const cors = require('cors');

const authentication = require('../controllers/authentication.js');
const tokenChecker = require('../controllers/tokenChecker.js');

const User = require('../models/user.js');
const Viaggio = require('../models/viaggio.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
});


app.use('/api/v1/authentications', authentication);



app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;