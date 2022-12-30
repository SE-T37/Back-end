const User = require ('../models/user');

const getUsers = async function(req, res,next) {
    const user = await User.findOne({username: req.loggedUser.username});
    const seguiti = user.seguiti;
    let resp=[];
    for(let i = 0; i < seguiti.length; i++){
        let amico= await User.findOne({username: seguiti[i]});
        resp.push(amico);
    }
    return res.status(200).json(resp);
};

module.exports ={ getUsers};