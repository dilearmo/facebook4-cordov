/* global $ */
/* global localStorage */
/* global toastr */

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    
    alert('onLoad');
}

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    alert('onDivecesadasd');
}

function onBackKeyDown() {
    alert('atras');
    $('#modalPreguntarSiSalir').modal('open');   
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