const User = require ('../models/user');

const getUsers = async function(req, res,next) {
    // ritorna prifili seguiti
    const user = await User.findOne({username: req.query.logedUser.username});
    const seguiti = user.seguiti;
    return res.json(resp);
};

module.exports ={ getUsers};