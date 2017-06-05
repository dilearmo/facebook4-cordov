/* global $ */
/* global toastr */
/* global localStorage */
var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";
$(document).ready(function() {
    $("#formRegistro").submit(
        function(e) {
            e.preventDefault();
        
            var Contrasena1 =  $("#contrasena1").val().trim();
            var Contrasena2 =  $("#contrasena2").val().trim();
            var Nombre = $("#nombre").val().trim();
            var Apellidos = $("#apellidos").val().trim();
            var NombreUsuario = $("#nombreUsuarioRegistro > input").val().trim();
            var Telefono = $("#telefono").val().trim();
            var Correo = $("#email").val().trim();
            if(Contrasena1 != Contrasena2) {
                toastr.error('Las contraseñas no coinciden');
            } else { 
                if (Contrasena1 != "" && Nombre != "" && Apellidos != "" && NombreUsuario != "" && Telefono != "" && Correo != "") {
                    //return registrarUsuario(Contrasena1, Nombre, Apellidos, NombreUsuario, Telefono, Correo);
                    existeNombreUsuario(Contrasena1, Nombre, Apellidos, NombreUsuario, Telefono, Correo);
                } else {
                    toastr.info('Por favor, ingrese los datos solicitados');
                }
            }
        }
    );
});

function registrarUsuario(Contrasena, Nombre, Apellidos, NombreUsuario, Telefono, Correo) {
    $.ajax({
        url: base_url + "WSUsuario/RegistroUsuario?contrasena=" + Contrasena + "&nombre=" + Nombre + "&apellidos=" +
            Apellidos + "&telefono=" + Telefono + "&nombreUsuario=" + NombreUsuario + "&correo=" + Correo,
        timeout: 200000,
        dataType: 'jsonp',
        success: function(response) {
            if (response == true) {
                toastr.success("Registrado Correctamente");
                window.setTimeout(function(){
                    $("button").attr('disabled', true);
                    validarCredenciales(NombreUsuario, Contrasena);
                }, 2000);
            }
            else {
                toastr.error("Error al registrar el usuario");
            }
        },
        error: function(err) {
            toastr.error("Error al registrar");
            //  window.alert("AJAX error in request: " + JSON.stringify(err, null, 2) + err.message);
            //  alert('Error message: '+msg.message+'\nURL: '+url+'\nLine Number: '+linenumber);
        }
    });
}

function validarCredenciales(nombreUsuario, contrasena) {
    $.ajax({
        url: base_url + "WSUsuario/validarCredenciales?nombreUsuario="+nombreUsuario+"&contrasena="+contrasena,
        dataType: "jsonp",
        timeout: 10000,
        success: function(response) {
            if(response == false) {
                toastr.error("Nombre de usuario o <br>contraseña incorrectos");
            } else {
                guardarUsuarioEnSesion(response);
            }
        },
        error: function() {
            alert('Error');
            toastr.error("Error de conexión");
        }
    });
}

function guardarUsuarioEnSesion(usuario) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("IdUsuario", usuario.IdUsuario);
        localStorage.setItem("Nombre", usuario.Nombre);
        localStorage.setItem("Apellidos", usuario.Apellidos);
        localStorage.setItem("Telefono", usuario.Telefono);
        localStorage.setItem("NombreUsuario", usuario.NombreUsuario);
        localStorage.setItem("Correo", usuario.Correo);
        localStorage.setItem("Es_confiable", usuario.Es_confiable);
        localStorage.setItem("Es_administrador", usuario.Es_administrador);
        
        window.location.href = 'index.html';
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
}

function existeNombreUsuario(contrasena, nombre, apellidos, username, telefono, correo) {
    $.ajax({
            url: base_url + "WSUsuario/existeNombreUsuario?nombreUsuario=" + username,
            timeout: 10000,
            dataType: 'jsonp',
            success: function(response) {
                if(response == true) {
                    // Significa que es registro con FB
                    if($('#hiddenFBSingup').val().trim().localeCompare('true') == 0) {
                        toastr.error("Usted ya se encuentra registrado<br>Por favor, diríjase a la página de login");
                    } else { // Registro normal
                        toastr.error("El nombre de usuario<br><b>" + username + "</b><br>ya existe");
                    }
                } else {
                    registrarUsuario(contrasena, nombre, apellidos, username, telefono, correo);
                }
            },
            error: function(a, b, c) {
                toastr.error("Error de conexión");
            }
        }
    );
}