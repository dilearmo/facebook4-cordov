$(document).ready(function() {
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario != undefined && nombreUsuario != "") {
            $('html, body').fadeOut(1500, function() {
                window.location.href = 'home.html';
            });
        } else {
            $('html, body').fadeOut(1500, function() {
                window.location.href = 'inicio.html';
            });
             //window.location.href = 'inicio.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
});