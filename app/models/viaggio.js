const mongoose = require("mongoose"); //import mongoose


// viaggio schema
const ViaggioSchema = new mongoose.Schema({
    username_utente: {type:String, required: true},
    titolo: String,
    descrizione: String,
    foto: String,
    lunghezza: Number,
    percorso: [{        //array di tappe
        foto: {type:String, default:''},
        descrizione: {type:String, default:''},
        latitudine: {type:String, default:''},
        longitudine: {type:String, default:''},
    }]
});

const Viaggio = mongoose.model('Viaggio', ViaggioSchema); //convert to model named Viaggio
module.exports = Viaggio; //export for controller use