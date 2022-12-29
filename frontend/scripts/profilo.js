function closePopUp() { document.getElementById("popupprofile").style.display = 'none'; };
function popUp() { document.getElementById("popupprofile").style.display = 'block'; }
function login(){
    // prendere i parametri dal html
    var username= document.getElementById("username"),value;
    fetch('../../app/controllers/authentication',{
        method: 'POST',
        headers: {'Content-Type': 'application/jason'},
        // body oppure query 
        body: JSON.stringify({username:username}),
    }).then((resp)=> resp.json())
    .then(function(data)){}
}