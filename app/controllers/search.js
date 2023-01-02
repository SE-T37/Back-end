const User = require ('../models/user');

const searchUsers = async function(req, res, next){
    
    let username= req.query.username;
    if(username==null){
        return res.status(400).json({message: "Bad request"});
    }
    // NB: l'errore 401 è già controllato dal tokenchecker
    let users = await User.find({ username: { $regex: username , $options: 'i' } });
    if(users.length==0){
        return res.status(404).json({message: "User not found"});
    }
    else{
        users = users.map((user) => {
            return {
                username: user.username,
                foto: user.foto
            };
        });
        return res.status(200).json(users);
    }
};

module.exports = { searchUsers };
