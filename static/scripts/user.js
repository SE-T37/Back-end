function checkPrivileges(url) {
    const logged = document.cookie.split(';')[0].split('=')[1];

    if (logged == null || logged.length == 0)
        location.replace("profilo.html");
    else
        location.replace(url);
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}



function getFoto(){
    const foto=getCookie("foto");
    if(foto==null || foto === undefined){
        document.getElementById("avatarsqr").innerHTML ="../assets/defUser.svg";
    }
    else{
        document.getElementById("avatarsqr").src = foto;
    }
}

function getUsername() {
    var username = document.cookie.split(';')[0].split('=')[1];

    if (username == null || username.length == 0)
        username = "Not Logged In";

    document.getElementById("usernamefield").innerHTML = username;
}

function getTravels(){
    const username=getCookie('username');
    if( username != null || username !== undefined ){
        const params = new URLSearchParams();
        params.set('token', getCookie('token'));
        fetch(`/getViaggi?${params}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        })
        .then((response) => {
            return response.json();
        })

        .then((data) => { 
            const keys = Object.keys(data);
            var index = 0;
            var field;

            while(data[keys[index]] != null && index <= 5){
                field = document.getElementById("myviaggio".concat(index+1));
                field.style.display = "block";
                field.getElementsByClassName("descrizioneviaggio")[0].innerHTML = data[keys[index]].descrizione;
                index++;
            }

            while(index <= 5){
                field = document.getElementById("myviaggio".concat(index+1));
                field.style.display = "none";
                index++;
            }
        })

        .catch(function (error) {
            console.log(error);
        });

    }
}

function login() {
    const username = document.getElementById("enterusernamefield").value.trim();
    const password = document.getElementById("enterpasswordfield").value.trim();

    fetch('./authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success == true) {
                document.cookie = "username=".concat(data.username).concat("; path=/");
                document.cookie = "foto=".concat(data.foto).concat("; path=/");
                document.cookie = "token=".concat(data.token).concat("; path=/");
                getUsername();
                getFoto();
                getTravels();
                document.getElementById("btnlogin").style.display = "none";
                document.getElementById("btnlogout").style.display = "block";
                document.getElementById("btnprofile").style.display = "block";
                //document.getElementById("usernamefield").innerHTML = data.username;
                //document.getElementById("avatarsqr").src = data.foto;
            }
        })

        .catch(function (error) {
            elem = document.getElementById("popuperror");
            elem.style.display = 'block';
            elem.getElementsByClassName("errorfield").innerHTML = error;
            console.log(error);
        });

}

function logout() {
    location.reload();
    document.getElementById("usernamefield").innerHTML = "Not Logged In";
    document.getElementById("avatarsqr").innerHTML ="../assets/defUser.svg";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie= "foto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie= "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function refresh(time) {
    setTimeout(refreshAux(), time);
}

function refreshAux() {
    const logged = document.cookie.split(';')[0].split('=')[1];

    if (logged == null || logged.length == 0) {
        document.getElementById("btnlogin").style.display = "block";
        document.getElementById("btnlogout").style.display = "none";
        document.getElementById("btnprofile").style.display = "none";
    }
    else {
        document.getElementById("btnlogin").style.display = "none";
        document.getElementById("btnlogout").style.display = "block";
        document.getElementById("btnprofile").style.display = "block";
    }
}

function editProfile() {
    const mail = "";
    const password = "";
    const foto = "";

    fetch('./editUser', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mail: mail,
            password: password,
            foto: foto
        })
    })

        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success == true) {

            }
        })
}


// le seguenti funzioni potrebbero essere spostate in un file seguiti.js
function getSeguiti(){
    const username=getCookie('username');
    if( username != null || username !== undefined ){
        const params = new URLSearchParams();
        params.set('token', getCookie('token'));
        fetch(`/getUsers?${params}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        })
        .then((response) => {
            return response.json();
        })

        .then((data) => { 
           //TODO aggiorna le foto circolari ()
        })

        .catch(function (error) {
            console.log(error);
        });

    }
}


function getViaggiAmici(){
    const username=getCookie('username');
    if( username != null || username !== undefined ){
        const params = new URLSearchParams();
        params.set('token', getCookie('token'));
        fetch(`/getViaggiAmici?${params}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
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
}


function searchUsers() {

    const searchTerm = "".concat(document.getElementById("followsearchbox").value);
    
    const params = new URLSearchParams();
    params.set('username', searchTerm);

    fetch(`/searchUsers?${params}`, {
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

            // CONTROLLA DOVE SALVARE I CAMPI DELLA RISPOSTA NELL'HTML
            /*
            while(data[keys[index]] != null && index <= 5){
                field = document.getElementById("userentry".concat(index+1));
                field.style.display = "block";
                field.getElementsByClassName("usersmall")[0].innerHTML = data[keys[index]].descrizione;
                index++;
            }

            while(index <= 5){
                field = document.getElementById("userentry".concat(index+1));
                field.style.display = "none";
                index++;
            }
            */
        })

        .catch(function (error) {
            console.log(error);
        });
}