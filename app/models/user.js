const mongoose = require("mongoose"); //import mongoose

// user schema
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    mail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
    },
    foto: {
        type: String,
    }    
});

const User = mongoose.model('User', UserSchema); //convert to model named user
module.exports = User; //export for controller use