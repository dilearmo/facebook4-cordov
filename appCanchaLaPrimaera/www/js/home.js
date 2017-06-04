/* global $ */
/* global localStorage */
/* global toastr */

$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario == undefined || nombreUsuario == "" || nombreUsuario == 'undefined') {
            window.location.href = 'login.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
    
    $("#usuario").text("Holis " + localStorage.Nombre + " " + localStorage.Apellidos);
    
    $(".button-collapse").sideNav();
});