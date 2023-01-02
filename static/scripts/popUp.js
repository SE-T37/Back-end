// apre e chiude il popup con id dato
// dal parametro delle funzioni

function popUp(selection) {
    document.getElementById("popup".concat(selection)).style.display = 'block';
}

function closePopUp(selecttion) {
    document.getElementById("popup".concat(selecttion)).style.display = 'none';
}