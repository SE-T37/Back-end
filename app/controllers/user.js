const { connection, default: mongoose } = require('mongoose');
const User = require ('../models/user');

const newUser = (req, res, next) => {;
    let username= req.body.username;
    let password= req.body.password;
    let mail= req.body.mail;
    let foto= req.body.foto;

    if(username== null || password== null || mail== null){
        return res.status(400).json({message: "Missing credentials"});
    }
    User.findOne({ username:username}, (err, data) => {

        if (err) 
            return res.status(500).json('Something went wrong, please try again. ${err}');

        if(!data){
            const newUser = new User({
                username: username,
                mail: mail,
                password: password,
                foto: foto,
            })
            newUser.save( (err,data) => {
                if (err) return res.status(500).json({message: "Error saving user"});
                else
                   return res.status(201).json(data);
                   
            })
        }else{
            return res.status(400).json({message: "User already exists"});
        }
    })
};

module.exports = { newUser};