const User = require ('../models/user');
console.log("controller");

const newUser = (req, res, next) => {
    res.json({message: "POST new User"});

};

module.exports = { newUser };