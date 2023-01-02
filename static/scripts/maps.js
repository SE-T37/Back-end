var map;
var numTappe = 1;

function initMap() {

    var docelement = document.getElementById('map');
    var attributes = {
        center: { lat: 46.074779, lng: 11.121749 },
        zoom: 12,
        disableDefaultUI: true
    }
    map = new google.maps.Map(docelement, attributes);
}


// Viene fatto un esempio dell'aggiunta di due tappe
// in questo caso i valori di latitudine e longitudine sono inseriti "manualmente"
// il funzionamento migliore sarebbe di ottenere latitudine e longitudine tramite la ricerca
function tappeEsempio() {
    addTappa();
    setTimeout(function () { }, 1000);
    const viaggio = {
        titolo: "Settimana a New York",
        descrizione: "Quest'estate ho fatto un viaggio a New York e ne sono rimasta incantata"
            + " La città è davvero emozionante, con i suoi grattacieli che si stagliano in cielo e la vita che pulsa in ogni angolo"
            + " Ho visitato luoghi iconici come la Statua della Libertà, Central Park e il Metropolitan Museum of Art, e ho anche avuto la"
            + "fortuna di assistere a uno spettacolo di Broadway. Non vedo l'ora di tornarci in futuro e scoprire ancora di più su questa città così vibrante.",
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

    var set= document.getElementById("inputviaggiotitle");
    set.placeholder = "Viaggio a New York";

    var set2= document.getElementById("inputdescrizioneviaggio");
    set2.placeholder = "Ho trascorso una settimana a New York con la mia"+
    "famiglia, abbiamo trovato un clima stupendo e ci siamo divertiti molto!";

    var tappe = document.getElementsByClassName("tappa");
    var input1 = document.getElementsByClassName("inputdescrizione")[0];
    var input2 = document.getElementsByClassName("inputdescrizione")[1];

    var tappa1 = tappe.item(0);
    input1.placeholder = viaggio.descrizione1;
    tappa1.children[1].children[0].src = viaggio.foto1;

    var tappa2 = tappe.item(1);
    input2.placeholder = viaggio.descrizione2;
    tappa2.children[1].children[0].src = viaggio.foto2;
    try{
        map.setCenter({ lat: +viaggio.latitudine1, lng: +viaggio.longitudine1 });
        marker1 = new google.maps.Marker({
            position: map.getCenter(),
            map: map
        });
        marker2 = new google.maps.Marker({
            position: map.getCenter(),
            map: map
        });
        marker2.setPosition({ lat: +viaggio.latitudine2, lng: +viaggio.longitudine2 });
        // Crea una linea che connette i due marker
        var line = new google.maps.Polyline({
            path: [marker1.getPosition(), marker2.getPosition()],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        // Aggiungi la linea alla mappa
        line.setMap(map);
    }catch(e){console.log("Error during map operations")}
}


function addTappa() {

    if(numTappe != 10){
    const tappelist = document.getElementById("tappelist");
  
    const newTappa = document.createElement("section");
    newTappa.className = "tappa";
  
    const tappasearchbar = document.createElement("div");
    tappasearchbar.className = "tappasearchbar";
    newTappa.appendChild(tappasearchbar);
  
    
    const tappasearchbox = document.createElement("input");
    tappasearchbox.type = "text";
    tappasearchbox.className = "tappasearchbox";
    tappasearchbox.placeholder = "Search location";
    tappasearchbar.appendChild(tappasearchbox);
  
    const btncercatappa = document.createElement("button");
    btncercatappa.type = "button";
    btncercatappa.className = "btncercatappa";
    btncercatappa.innerText = "⌕";
    tappasearchbar.appendChild(btncercatappa);
  
    
    const flexbox = document.createElement("div");
    flexbox.className = "flexbox";
    newTappa.appendChild(flexbox);
  
    const image = document.createElement("img");
    image.id = "image1";
    image.className = "roundedimg";
    image.src = "assets/image.svg";
    image.alt = "Error";
    image.height = "100";
    image.width = "100";
    flexbox.appendChild(image);
  
   
    const inputdescrizione = document.createElement("textarea");
    inputdescrizione.rows = "5";
    inputdescrizione.cols = "60";
    inputdescrizione.className = "inputdescrizione";
    inputdescrizione.placeholder = "Insert description";
    flexbox.appendChild(inputdescrizione);
  
    
    const btnaggiungifoto = document.createElement("input");
    btnaggiungifoto.type = "file";
    btnaggiungifoto.className = "btnaggiungifoto";
    btnaggiungifoto.accept = "image/*";
    flexbox.appendChild(btnaggiungifoto);

    tappelist.appendChild(newTappa);
    numTappe++;
    }
}
