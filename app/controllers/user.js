const User = require ('../models/user');
console.log("controller");

const newUser = (req, res, next) => {
  
    //firs check existance in db
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
                if (err) return res.json({Error: err});
                return res.json(data);
            })
        }else{
            if (err) return res.json('Something went wrong, please try again. ${err}');
            return res.json({message: "User already exists"});
        }
    })

};

module.exports = { newUser };