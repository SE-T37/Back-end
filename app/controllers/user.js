const User = require ('../models/user');

const newUser = (req, res, next) => {;
    User.findOne({ username: req.body.username}, (err, data) => {

        if(!data){
            const newUser = new User({
                username: req.body.username,
                mail: req.body.mail,
                password: req.body.password,
                foto: req.body.foto,
                viaggi: req.body.viaggi,
                seguiti: req.body.seguiti,
                autenticato: req.body.autenticato,
            })

            newUser.save( (err,data) => {
                if (err) return res.status(500).json({Error: err});
                else
                   return res.status(201).json(data);
                   
            })
            
        }else{
            if (err) return res.status(500).json('Something went wrong, please try again. ${err}');
            return res.status(400).json({message: "User already exists"});
        }
    })
};

module.exports = { newUser};