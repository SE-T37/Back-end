const Viaggio = require ('../models/viaggio');
const User = require ('../models/user');


//Creazione nuovo viaggio
const newViaggio = (req, res, next) => {
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
                if (err) return res.status(400).json({Error: err});
                else
                    return res.status(201).json(data);
            })

    };

    
module.exports = {
    newViaggio,
};