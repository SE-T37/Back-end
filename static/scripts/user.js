// funzione ausiliaria per accedere ai cookies più facilmente
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}


// controlla se l'utente ha i permessi (è loggato)
// di accedere ad una pagina
function checkPrivileges(url) {

    // controllo se i dati dell'utente sono salvati nei cookies
    const logged = getCookie("username");

    // se non presenti, l'utente non è loggato, quindi
    // viene reindirizzato alla schermata di login;
    // altrimenti prosegue all'url desiderato
    if (logged == null || logged == undefined || logged.length == 0)
        location.replace("profilo.html");
    else
        location.replace(url);
}


// imposta la foto profilo nella schermata 'profilo'
// a quella dell'utente contenuta nei cookies
function getFoto() {
    var foto = getCookie("foto");

    // se nei cookies non è presente la foto utente
    // viene caricata l'immagine default
    if (foto == null || foto === undefined || foto.length == 0)
        foto = "../assets/defUser.svg";

    document.getElementById("avatarsqr").src = foto;
}


// imposta l'username nella schermata 'profilo'
// a quello dell'utente contenuto nei cookies
function getUsername() {
    var username = getCookie('username');

    // se nei cookies non è presente l'username
    // viene notificato all'utente di non essere autenticato
    if (username == null || username.length == 0 || username.length == 0)
        username = "Not Logged In";

    document.getElementById("usernamefield").innerHTML = username;
}


// ottiene i viaggi postati dall'utente autenticato
function getTravels() {

    // controlla che l'utente sia autenticato
    const token = getCookie('token');
    if (token != null && token != undefined && token.length != 0) {
        const params = new URLSearchParams();
        params.set('token', token);

        // chiamata all'api di ricerca dei viaggi di un utente
        fetch(`/getViaggi?${params}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
        })
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                const keys = Object.keys(data);
                var index = 0;
                var field;

                // aggiorna la lista dei propri viaggi
                // nella schermata 'profilo'
                while (data[keys[index]] != null && index <= 5) {
                    field = document.getElementById("myviaggio".concat(index + 1));
                    field.style.display = "block";
                    field.getElementsByClassName("descrizioneviaggio")[0].innerHTML = data[keys[index]].descrizione;
                    field.getElementsByClassName("roundedimg")[0].src = data[keys[index]].foto;
                    index++;
                }

                // nasconde i rimanenti campi non utilizzati
                while (index <= 5) {
                    field = document.getElementById("myviaggio".concat(index + 1));
                    field.style.display = "none";
                    index++;
                }
            })
    }
};


// funzione di login al sito
function login() {

    // ottiene i dati dai campi dal documento html
    const username = document.getElementById("enterusernamefield").value.trim();
    const password = document.getElementById("enterpasswordfield").value.trim();

    // chiamata all'api di autenticazione
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

            // in caso di successo, aggiunge ai cookies i
            // dati rilevanti dell'utente
            if (data.success == true) {
                document.cookie = "username=".concat(data.username).concat("; path=/");
                document.cookie = "foto=".concat(data.foto).concat("; path=/");
                document.cookie = "token=".concat(data.token).concat("; path=/");

                // e aggiorna la schermata profilo con i nuovi dati
                getUsername();
                getFoto();
                getTravels();

                // infine modifica la visibilità dei diversi pulsanti
                document.getElementById("btnlogin").style.display = "none";
                document.getElementById("btnlogout").style.display = "block";
                document.getElementById("btnprofile").style.display = "block";
            }

            // mostra un popup di errore in caso il login fallisca
            else {
                elem = document.getElementById("popuperror");
                elem.style.display = 'block';
                document.getElementById("errorfield").innerHTML = "Failed to Log In, please try again later.";
            }
        })

        .catch(function (error) {
            elem = document.getElementById("popuperror");
            elem.style.display = 'block';
            document.getElementById("errorfield").innerHTML = "Failed to Log In, please try again later.";
        });
}


// funzione di logout dal sito
function logout() {
    location.reload();

    // resetta la pagina del profilo utente
    document.getElementById("usernamefield").innerHTML = "Not Logged In";
    document.getElementById("avatarsqr").innerHTML = "../assets/defUser.svg";

    // elimina tutti i cookies del sito segnalandoli come scaduti
    document.cookie = "username=; expires=-1; path=/;";
    document.cookie = "foto=; expires=-1; path=/;";
    document.cookie = "token=; expires=-1; path=/;";
}


// effettua un refresh dei pulsanti in base allo stato
// dell'utente, dopo un tempo definito di sleep
function refresh(time) {
    setTimeout(refreshAux(), time);
};
function refreshAux() {
    const logged = getCookie('token');

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


// permette di modificare il profilo
function editProfile() {

    // ottiene i valori dai campi del documento html
    const mail_H = document.getElementById("editmailfield").value;
    const password_H = document.getElementById("editpasswordfield").value;
    const foto_H = document.getElementById("editfotofield").value;
    const confirm_H = document.getElementById("confirmfield").value;

    // controlla che le password inserite corrispondano
    if (confirm_H == password_H && confirm_H != null && confirm_H !== undefined && confirm_H.trim().length > 0) {

        // chiamata all'api di modifica del profilo utente
        fetch('./editUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: getCookie("token"),
                mail: mail_H,
                password: password_H,
                foto: foto_H
            })
        })

            .catch(function (error) {
                elem = document.getElementById("popuperror");
                elem.style.display = 'block';
                document.getElementById("errorfield").innerHTML = "Failed to Edit Profile, please try again later.";
            });
    }

    else {
        elem = document.getElementById("popuperror");
        elem.style.display = 'block';
        document.getElementById("errorfield").innerHTML = "Passwords do not match, please try again.";
    }
}


// ottiene i profili seguiti dall'utente ed aggiorna gli
// avatar in alto a destra nella schermata 'seguiti'
function getSeguiti() {

    // ottiene il token dell'utente dai cookies
    const token = getCookie('token');

    if (token != null && token !== undefined || token.length == 0) {
        const params = new URLSearchParams();
        params.set('token', token);

        // chiamata all'api di ricerca utenti
        fetch(`/getUsers?${params}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
        })
            .then((response) => {
                return response.json();
            })

            .then((data) => {

                // ottiene tutte le immagini avatar nella sotto
                // sezione 'pallini'
                const pallini = document.getElementById('pallini');
                const avatars = pallini.getElementsByClassName('avatar');

                // aggiorna ciascuno degli avatar con la foto
                // di uno degli utenti seguiti
                for (let i = 0; i < avatars.length - 1; i++) {
                    let userFoto = data[i].foto

                    // se un utente non ha inserito una foto,
                    // viene utilizzata quella standard
                    if (userFoto == null || userFoto === undefined || userFoto.length < 10) {
                        userFoto = "assets/defUser.svg";
                    }
                    avatars[i].src = userFoto;
                }
            })

            .catch(function (error) {
                console.log(error);
            });

    }
}


// ottiene i viaggi dei profili seguiti dall'utente ed aggiorna 
// la lista di viaggi nella schermata 'seguiti'
function getViaggiAmici() {

    // controlla che l'utente sia loggato
    const token = getCookie('token');
    if (token != null && token != undefined && token.length != 0) {
        const params = new URLSearchParams();
        params.set('token', token);

        // chiamata all'api di ricerca viaggi degli amici
        fetch(`/getViaggiAmici?${params}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
        })
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                const keys = Object.keys(data);
                var index = 0;
                var field;

                // aggiorna tutte le schede dei viaggi nella
                // lista viaggi in 'seguiti'
                while (data[keys[index]] != null && index <= 5) {

                    field = document.getElementById("viaggio".concat(index + 1));
                    field.style.display = "block";
                    field.getElementsByClassName("descrizioneviaggio")[0].innerHTML = data[keys[index]].descrizione;

                    const foto = [data[keys[index]]][0].foto;

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

                // nasconde tutte le schede non utilizzate
                while (index <= 5) {
                    field = document.getElementById("viaggio".concat(index + 1));
                    field.style.display = "none";
                    index++;
                }
            })

    }
}


// aggiunge una scheda utente nella lista dei profili
// nel popup di aggiunta follow
function generateUserEntry(userUsername, userFoto) {
    const userEntry = document.createElement("section");
    userEntry.classList.add("userentry");

    const avatar = document.createElement("img");
    avatar.classList.add("avatarsmall");

    if (userFoto != null && userFoto !== undefined && userFoto.length > 10) {
        avatar.src = userFoto;
    }
    else {
        avatar.src = "assets/defUser.svg";
    }

    avatar.alt = "pfp";

    const username = document.createElement("p");
    username.classList.add("usernamesmall");
    username.textContent = userUsername;

    userEntry.appendChild(avatar);
    userEntry.appendChild(username);


    return userEntry;
}


// elimina le schede degli utenti (nella lista dei profili
// nel popup di aggiunta follow) non in utilizzo 
function deleteUserEntries() {
    const userEntries = document.querySelectorAll(".userentry");
    if (userEntries.length > 0) {
        for (const userEntry of userEntries) {
            userEntry.remove();
        }
    }
}


// funzione di ricerca utenti
function searchUsers() {

    // inizializza il termine di ricerca in modo che
    // se la barra di ricerca è vuota vengano restituiti
    // tutti i risultati nel DB
    const searchTerm = "".concat(document.getElementById("followsearchbox").value);

    const params = new URLSearchParams();
    params.set('username', searchTerm);
    params.set('token', getCookie('token'));

    // chiamata all'api di ricerca utente
    fetch(`./searchUser?${params}`, {
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
            deleteUserEntries();
            while (data[keys[index]] != null && index <= 5) {
                const userList = document.getElementById("userlist");
                const userEntry = generateUserEntry(data[index].username, data[index].foto);
                userList.appendChild(userEntry);
                index++;
            }
        })
};