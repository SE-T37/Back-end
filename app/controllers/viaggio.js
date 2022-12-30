const Viaggio = require ('../models/viaggio');
const User = require ('../models/user');


//Creazione nuovo viaggio
const newViaggio =async function(req, res, next) {
    
    const id_richiedente=req.loggedUser.id;
    let user_richiedente= await User.findOne({ _id: id_richiedente});

    const newViaggio = new Viaggio({
        username_utente: req.loggedUser.username,
        titolo: req.body.titolo,
        descrizione: req.body.descrizione,
        foto: req.body.foto,
        lunghezza: req.body.lunghezza,
    })           
    
    //aggiunta delle tappe al viaggio
    //nella paginaWeb saranno presenti 10 form, uno per ogni tappa
    for(let i=1; i<=10; i++){
        eval('var fotoForm' + ' = ' + 'req.body.foto' + i + ';');
        eval('var descrizioneForm' + ' = ' + 'req.body.descrizione' + i + ';');
        eval('var latitudineForm' + ' = ' + 'req.body.latitudine' + i + ';');
        eval('var longitudineForm' + ' = ' + 'req.body.longitudine' + i + ';');                
        newViaggio.percorso.push({
            foto:fotoForm,
            descrizione:descrizioneForm,
            latitudine:latitudineForm,
            longitudine:longitudineForm,
        })        
    }

    newViaggio.save( (err,data) => {
        if (err) {
            return res.status(500).json({Error: err});
        }
        else{
            user_richiedente.viaggi.push(newViaggio._id);
            user_richiedente.save();
            return res.status(201).json(data);
        }
    })
};

    
module.exports = {
    newViaggio,
};