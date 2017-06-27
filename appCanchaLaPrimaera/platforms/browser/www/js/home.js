/* global $ */
/* global localStorage */
/* global toastr */

/*document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
   e.preventDefault();
   alert('Back Button is Pressed!');
}*/


$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario == undefined || nombreUsuario == "" || nombreUsuario == 'undefined') {
            window.location.href = 'login.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
    
    /*document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown(e) {
       e.preventDefault();
       alert('Back Button is Pressed!');
    }*/
    
    $("#usuario").html($("#usuario").html() + localStorage.Nombre + " " + localStorage.Apellidos);
    
    $(".button-collapse").sideNav();
    
    $('.modal').modal();
});