const User = require ('../models/user');

const newUser = (req, res, next) => {
    //firs check existance in db
    //console.log (req.body.username);
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

const searchUsers = async function(req, res, next){
    //firs check existance in db
    //console.log (req.body.username);

    let users = await User.find({});
    users = users.map((user) => {
        return {
            self: '/' + user.username,
            username: user.username
        };
    });
    res.status(200).json(users);

};

module.exports = { newUser, searchUsers };