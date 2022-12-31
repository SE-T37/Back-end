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
