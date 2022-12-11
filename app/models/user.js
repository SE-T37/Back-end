const mongoose = require("mongoose"); //import mongoose

// user schema
const userSchema = new mongoose.Schema({
    //user schema to define...
});

const user = mongoose.model('user', TeaSchema); //convert to model named user
module.exports = user; //export for controller use