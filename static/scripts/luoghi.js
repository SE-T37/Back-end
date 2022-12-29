var lowerBound;
var upperBound;

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

function getViaggi(custom) {
    var searchTerm;

    if (custom) {
        searchTerm = document.getElementById("viaggisearchbox").value;
    }
    else {
        searchTerm = " ";

    }
    fetch('../../app/controllers/searchViaggio', {
        method: 'GET',
        headers: { 'Content-Type': 'application/jason' },
        query: JSON.stringify({
            luogo: searchTerm,
            lunghezzaMin: lowerBound,
            lunghezzaMax: upperBound
        }),
    })
        .then((response) => {
            return response.json();
        })

        .then((data) => { 
            const keys = Object.keys(data);
            var index = 1;
            var field;

            while(data[keys[index]] != null && index <= 6){
                field = document.getElementById("viaggio".concat(index));
                field.style.display = "block";
                field.getElementsByClassName("descrizioneviaggio") = data[keys[index]].title.concat("\n").concat(data[keys[index]].descrizione);
                index++;
            }

            while(index <= 6){
                field = document.getElementById("viaggio".concat(index));
                field.style.display = "none";
                index++;
            }
        })

        .catch(function (error) {
            console.log(error);
        });
}