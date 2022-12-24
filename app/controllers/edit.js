const User = require ('../models/user');

const editUser = async function(req, res, next){

  // NB: l'errore 401 è già controllato dal tokenchecker

  User.findByIdAndUpdate(req.loggedUser.id, req.body, {new:true}, (err,user) =>{
    if(err) return res.status(400).json({Error: err});
    else{
      return res.status(200).json(user);
    }
  });
    
};
module.exports = { editUser };

