const User = require ('../models/user');

const searchUsers = async function(req, res, next){
    
    // NB: l'errore 401 è già controllato dal tokenchecker
    let users = await User.find({ username: { $regex: req.body.username , $options: 'i' } });
    if(!users){
        return res.status(404).json({message: "User not found"});
    }
    else{
        users = users.map((user) => {
            return {
                self: '/' + user.username,
                username: user.username
            };
        });
        return res.status(200).json(users);
    }
};

module.exports = { searchUsers };
