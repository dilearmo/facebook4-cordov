/* global $ */
/* global localStorage */
/* global toastr */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
        document.addEventListener("backbutton", preguntarSiSalir, false);
        
        function preguntarSiSalir() {
            $('#modalPreguntarSiSalir').modal('open');
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
        
        
    }
};

app.initialize();


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