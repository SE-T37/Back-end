const User = require ('../models/user');

const seguiUser = async function(req, res, next){
    
    // NB: l'errore 401 è già controllato dal tokenchecker
    const id_richiedente=req.loggedUser.id;
    let user_to_follow = await User.findOne({ username: req.body.username });
    let user_richiedente= await User.findOne({ _id: id_richiedente});
    
    if(user_to_follow==null){
        // controllo che l'utente che voglio seguire esista
        return res.status(404).json({message: "User not found"});
    }
    else{
        if(user_richiedente.seguiti.includes(req.body.username)){
            // controllo che l'utente non sia già tra quelli seguiti
            return res.status(400).json({ message: "Already following"});
        }
        else{
            user_richiedente.seguiti.push(user_to_follow.username);
            try{
                await user_richiedente.save();
                return res.status(200).json(user_richiedente.seguiti)
            }catch(e){return res.status(500).json({message:"Internal server error"})};
        
        }
    }
};

module.exports = { seguiUser };
