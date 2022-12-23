const User = require ('../models/user');


const seguiUser = async function(req, res, next){

    let user_to_follow = await User.findOne({ username: req.body.username });
    let user_richiedente= await User.findOne({ _id: req.body._id});
    const seguiti=user_richiedente.seguiti;

    if(!user_to_follow){
        // controllo che l'utente che voglio seguire esista
        return res.status(404).json({message: "User not found"});
    }
    if(seguiti.includes(req.body.username)){
        // controllo che l'utente non sia già tra quelli seguiti
        return res.status(400).json({ message: "Already following"});
    }
    else{
        User.findOneAndUpdate({ _id: req.body._id }, { $push: { seguiti: req.body.username } }, { new: true }, (err, user) => {
            if (err) {
               return res.status(500).json({ err: err});
            } else {
              return res.status(200).json(user.seguiti); 
            }
         });
    }
    

};

module.exports = { seguiUser };
