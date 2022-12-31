let map;
function initMap() {

    var docelement = document.getElementById('map');
    var attributes = {
        center: { lat: 46.074779, lng: 11.121749 },
        zoom: 12,
        disableDefaultUI: true
    }
    map = new google.maps.Map(docelement, attributes);
}

function addTappa() {
    const tappa = document.getElementsByClassName("tappa");
    var i = 0;
    while(tappa[i].style.display != "none")
        i++;
    tappa[i].style.display = "block";
}
function tappeEsempio(){
    const viaggio={
        titolo: "Settimana a New York",
        descrizione: "Quest'estate ho fatto un viaggio a New York e ne sono rimasta incantata"
        +" La città è davvero emozionante, con i suoi grattacieli che si stagliano in cielo e la vita che pulsa in ogni angolo"
        +" Ho visitato luoghi iconici come la Statua della Libertà, Central Park e il Metropolitan Museum of Art, e ho anche avuto la"
        +"fortuna di assistere a uno spettacolo di Broadway. Non vedo l'ora di tornarci in futuro e scoprire ancora di più su questa città così vibrante.",
        foto: "https://images.lonelyplanetitalia.it/static/places/new-york-city-319.jpg?q=90&p=2400%7C1350%7Cmax&s=d0b66f564422dd0d2d51bc78ee7c7dbd",
        lunghezza: 20000,
        foto1: "https://upload.wikimedia.org/wikipedia/commons/0/05/Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg",
        descrizione1: "Giorno 1: Pic-nic al Central park! Abbiamo deciso di dedicarci dopo un lungo viaggio una giornata di relax distesi nel parco più grande della città",
        latitudine1: "40.782",
        longitudine1: "-73.965",
        foto2: "https://sanashaw.com/wp-content/uploads/2019/05/IMG_20190416_111324482-1.jpg",
        descrizione2: "Verso sera abbiamo deciso di andare a visitare il MoMA anche se la folla davanti a Les Demoiselles d'Avignon era infinita....",
        latitudine2: "40.761",
        longitudine2: "-73.978",
    }
        field="tappeselection1";
        field.style.display = "block";
        field.getElementsByClassName("descrizioneviaggio")[0].innerHTML = data[keys[index]].descrizione;
        index++;
}

