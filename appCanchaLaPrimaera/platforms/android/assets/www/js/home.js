/* global $ */
/* global localStorage */
/* global toastr */

function onLoad() {
    alert('onLoad');
    document.addEventListener("deviceready", onDeviceReady, false);
}

    
function onDeviceReady() {
    alert('onDeviceReady');
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    alert('onBackKeyDown');
    $('#modalPreguntarSiSalir').modal();
}


$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario == undefined || nombreUsuario == "" || nombreUsuario == 'undefined') {
            window.location.href = 'login.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
    
    $("#usuario").html($("#usuario").html() + localStorage.Nombre + " " + localStorage.Apellidos);
    
    $(".button-collapse").sideNav();
    
    $('.modal').modal();
});