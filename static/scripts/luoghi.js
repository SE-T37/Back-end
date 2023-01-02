var lowerBound;
var upperBound;

// aggiorna i limiti di distanza nel viaggio da cercare
// in base al termine selezionato
function setBounds(term) {
    switch (term) {
        case 'walk':
            lowerBound = 0;
            upperBound = 1000;
            break;
        case 'journey':
            lowerBound = 1000;
            upperBound = 10000;
            break;
        case 'odyssey':
            lowerBound = 10000;
            upperBound = 1000000;
            break;
        case 'all':
            lowerBound = 0;
            upperBound = 1000000;
            break;
    }
}


// ottiene i viaggi dal database che abbiano la lunghezza
// correntemente selezionata e, se è una ricerca custom,
// il termine inserito
function getViaggi(custom) {
    var searchTerm = "";

    if (custom)
        searchTerm = "".concat(document.getElementById("viaggisearchbox").value);

    const params = new URLSearchParams();
    params.set('titolo', searchTerm);
    params.set('lunghezzaMin', lowerBound);
    params.set('lunghezzaMax', upperBound);

    // chiamata all'api di ricerca viaggi
    fetch(`/searchViaggio?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            const keys = Object.keys(data);
            var index = 0;
            var field;

            // aggiorna i 6 campi disponibili nella lista viaggi
            while (data[keys[index]] != null && index <= 5) {
                field = document.getElementById("viaggio".concat(index + 1));
                field.style.display = "block";
                field.getElementsByClassName("descrizioneviaggio")[0].innerHTML = data[keys[index]].descrizione;
                const foto = [data[keys[index]]][0].foto;

                // mostra l'immagine di default dove non presente una
                // foto del viaggio
                if (foto != null && foto !== undefined) {
                    try {
                        const imageElements = document.getElementsByClassName("roundedimg");
                        const firstImageElement = imageElements[index];
                        firstImageElement.src = foto;
                    } catch (e) {
                        const imageElements = document.getElementsByClassName("roundedimg");
                        const firstImageElement = imageElements[index];
                        firstImageElement.src = "../assets/image.svg";
                    }
                }
                index++;
            }

            // nasconde i rimanenti campi della lista
            while (index <= 5) {
                field = document.getElementById("viaggio".concat(index + 1));
                field.style.display = "none";
                index++;
            }
        })
}