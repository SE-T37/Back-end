const User = require ('../models/user');
const Viaggio = require ('../models/viaggio');

const getViaggi = async function(req, res,next) {
    // ritorna tutti i viaggi di un utente
    const user = await User.findOne({username: req.query.logedUser.username});
    const viaggi = User.viaggi; // contains only the id of the viaggi but i want the viaggi model
    let resp;
    for(let i = 0; i < viaggi.length; i++){
        resp.push(await Viaggio.findOne({_id: viaggi[i]}))
    }
    return res.json(resp);
};

module.exports ={getViaggi};