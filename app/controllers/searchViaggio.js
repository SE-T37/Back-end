const Viaggio = require('../models/viaggio');
const User = require ('../models/user');


const searchViaggio = async function(req, res, next){
    
    let viaggi = await Viaggio.find({ 
        titolo: { $regex: req.body.luogo , $options: 'i' },     //cerca i viaggi che nel titolo contengono il luogo specificato
        lunghezza: { $gte: req.body.lunghezzaMin, $lte: req.body.lunghezzaMax}     //lunghezzaMin <= lunghezza <= lunghezzaMax
    });

    if(!viaggi){
        return res.status(404).json({message: "Nessun viaggio trovato"});
    }
    else{
        viaggi = viaggi.map((viaggio) => {
            return {
                username_utente: viaggio.username_utente,
                titolo: viaggio.titolo,
                descrizione: viaggio.descrizione,
                foto: viaggio.foto,
                lunghezza: viaggio.lunghezza,
                percorso: viaggio.percorso
            };
        });
        return res.status(200).json(viaggi);
    }
};


module.exports = { searchViaggio };
