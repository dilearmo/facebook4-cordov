/* global $ */
/* global toastr */
/* global localStorage */
var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";
$(document).ready(function() {




    $("#envoyer").submit(function(e) {
        
    e.preventDefault();

    var Contrasena = document.getElementById("Contrasena").value;
    var Nombre = $("#Nombre").val().trim();
    var Apellidos = document.getElementById("Apellidos").value;
    var NombreUsuario = document.getElementById("NombreUsuario").value;
    var Telefono = document.getElementById("Telefono").value;
    var Correo = document.getElementById("Correo").value;
    if (Contrasena != "" && Nombre != "" && Apellidos != "" && NombreUsuario != "" && Telefono != "" && Correo != "") {
        return registrarUsuario(Contrasena, Nombre, Apellidos, NombreUsuario, Telefono, Correo);
    }
    else {
        window.alert("llene sus datos");
    }




    });
    });

function registrarUsuario(Contrasena, Nombre, Apellidos, NombreUsuario, Telefono, Correo) {



    $.ajax({
        url: base_url + "WSUsuario/RegistroUsuario?Contrasena=" + Contrasena + "&Nombre=" + Nombre + "&Apellidos=" +
            Apellidos + "&Telefono=" + Telefono + "&NombreUsuario=" + NombreUsuario + "&Correo=" + Correo,
        timeout: 200000,
        dataType: 'jsonp',
        success: function(response) {
            if (response == true) {
                toastr.success("Registrado Correctamente");
                window.location.replace("https://app-cancha-la-primavera-dilearmo.c9users.io/login.html");
            }
            else {
                toastr.error("Usuario ya existe o sus datos deben ser bien llenados");
            }
        },
        error: function(err) {
            toastr.error("Error al registrar");
            //  window.alert("AJAX error in request: " + JSON.stringify(err, null, 2) + err.message);
            //  alert('Error message: '+msg.message+'\nURL: '+url+'\nLine Number: '+linenumber);
        }


    });
}




