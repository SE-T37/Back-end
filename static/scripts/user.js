function checkPrivileges(url) {
    if (document.cookie != "")
        location.replace(url);
    else
        location.replace("profilo.html");
}

function getUsername() {
    var username;
    if (document.cookie == "")
        username = "Not Logged In";
    else
        username = document.cookie.split(';')[0].split('=')[1].trim();
    document.getElementById("usernamefield").innerHTML = username;
}

function login() {
    const username = document.getElementById("enterusernamefield").value;
    const password = document.getElementById("enterpasswordfield").value;

    fetch('../../app/controllers/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/jason' },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })

        .then((response) => {
            return response.json();
        })

        .then((data) => {
    if (document.cookie != "")
            document.cookie = "username=".concat(data.username).concat("; path=/");
            document.getElementById("usernamefield").innerHTML = data.username;
        })

        .catch(function (error) {
            elem = document.getElementById("popuperror");
            elem.style.display = 'block';
            elem.getElementsByClassName("errorfield").innerHTML = error;
            console.log(error);
        });
}

function logout() {
    document.cookie = "";
}