const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const routes= require('../app/routes/user');
app.use('/', routes);


mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);


const listener= app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + listener.address().port)
})