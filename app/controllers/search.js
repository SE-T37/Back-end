const User = require ('../models/user');

const searchUsers = async function(req, res, next){
    //firs check existance in db
    //console.log (req.body.username);
    User.findOne({ username: req.body.username}, (err, data) => {
        if(!data)
            return res.status(404).json({message: "No users with this username were found"})
    });

    let users = await User.find({});
    users = users.map((user) => {
        return {
            self: '/' + user.username,
            username: user.username
        };
    });
    res.status(200).json(users);

};

module.exports = { searchUsers };