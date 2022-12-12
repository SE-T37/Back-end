const mongoose = require("mongoose"); //import mongoose

// user schema
const UserSchema = new mongoose.Schema({
    username: {type:String, required: true},
    mail: String,
    password: String,
    foto: String,
    viaggi:[String],
    seguiti: [String],
    autenticato:{
        type: Boolean,
        required: true,
        default: false,

    },

    // autenticato will be replaced when creating the autentication setting
});

const User = mongoose.model('User', UserSchema); //convert to model named user
module.exports = User; //export for controller use