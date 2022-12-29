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
    let searchTerm;

    if (custom) {
        searchTerm = "".concat(document.getElementById("viaggisearchbox").value);
    }
    else {
        searchTerm = " ";

    }
    const params = new URLSearchParams();
    params.set('titolo', searchTerm);
    params.set('lunghezzaMin', lowerBound);
    params.set('lunghezzaMax', upperBound);

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

            while(data[keys[index]] != null && index <= 5){
                field = document.getElementById("viaggio".concat(index+1));
                field.style.display = "block";
                field.getElementsByClassName("descrizioneviaggio")[0].innerHTML = data[keys[index]].descrizione;
                index++;
            }

            while(index <= 5){
                field = document.getElementById("viaggio".concat(index+1));
                field.style.display = "none";
                index++;
            }
        })

        .catch(function (error) {
            console.log(error);
        });
}