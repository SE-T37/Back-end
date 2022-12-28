const User = require ('../models/user');

const searchUsers = async function(req, res, next){
    
    let username= req.query.username;
    if(!username){
        return res.status(400).json({message: "Bad request"});
    }
    // NB: l'errore 401 è già controllato dal tokenchecker
    let users = await User.find({ username: { $regex: username , $options: 'i' } });
    if(!users){
        return res.status(404).json({message: "User not found"});
    }
    else{
        users = users.map((user) => {
            return {
                //self: '/' + user.username,
                username: user.username
            };
        });
        return res.status(200).json(users);
    }
};

module.exports = { searchUsers };
