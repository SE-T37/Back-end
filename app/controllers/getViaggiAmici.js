const User = require ('../models/user');
const Viaggio = require ('../models/viaggio');

const getViaggiAmici = async function(req, res,next) {
    const user_richiedente= User.findOne({username: req.loggedUser.username})
    let amici= user_richiedente.seguiti;
    let resp;
    for(let i=0;i<amici.length;i++) {
        amico=User.findOne({username: amici[i]});
        for(let x=0; x<amico.viggi.length; x++) {
            let viaggiox=Viaggio.findOne({_id: amico.viaggi[x]});
            resp.push(viaggiox);
        }
    }
    return res.json(resp);
};

module.exports = {getViaggiAmici};