function checkPrivileges(url) {
    const logged = document.cookie.split(';')[0].split('=')[1];

    if (logged == null || logged.length == 0)
        location.replace("profilo.html");
    else
        location.replace(url);
}

function getUsername() {
    var username = document.cookie.split(';')[0].split('=')[1];

    if (username == null || username.length == 0)
        username = "Not Logged In";

    document.getElementById("usernamefield").innerHTML = username;
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
                document.getElementById("usernamefield").innerHTML = data.username;
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
    document.cookie = "username=; expires=-1; path=/";
    document.getElementById("usernamefield").innerHTML = "Not Logged In";
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