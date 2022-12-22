const User = require ('../models/user');


const editUsers = async function(req, res, next){

    User.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,user) =>{
        if(err) return res.status(400).send(err);
        else{
          return res.status(200).send(user);
        }
      });
    
};

module.exports = { editUsers };

