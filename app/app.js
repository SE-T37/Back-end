const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const authentication = require('./routes/authentication.js');
const tokenChecker = require('./controllers/tokenChecker.js');

const user = require('./routes/user');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors())



//app.use('/', express.static(process.env.FRONTEND || 'static'));
// If process.env.FRONTEND folder does not contain index.html then use the one from static
//app.use('/', express.static('static')); // expose also this folder


app.use((req,res,next) => {
    console.log(req.method + ' ' + req.url)
    next()
})





/**
 * Authentication routing and middleware
 */
app.use('/authentications', authentication);

// Protect booklendings endpoint
// access is restricted only to authenticated users
// a valid token must be provided in the request



/**
 * Resource routing
 */
app.use('/user', user);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});



module.exports = app;