const User = require ('../models/user');
const Viaggio = require ('../models/viaggio');

const getViaggiAmici = async function(req, res,next) {
    const user_richiedente= await User.findOne({username: req.loggedUser.username});
    const amici= user_richiedente.seguiti;
    let resp=[];
    for(let i=0;i<amici.length;i++) {
        let amico=await User.findOne({username: amici[i]});
        const viaggiamico= amico.viaggi;
        for(let x=0; x<viaggiamico.length; x++) {
            let viaggiox=await Viaggio.findOne({_id: amico.viaggi[x]});
            resp.push(viaggiox);
        }
    }
    return res.status(200).json(resp);
};

module.exports = {getViaggiAmici};