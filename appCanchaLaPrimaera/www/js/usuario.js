 /*
    global $
    global toastr
    global location
    global localStorage
    */
    
var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";
    $(document).ready(function() {
       /*  toastr.warning(localStorage.IdUsuario); 
        localStorage.setItem("IdUsuario", usuario.IdUsuario);
        localStorage.setItem("Nombre", usuario.Nombre);
        localStorage.setItem("Apellidos", usuario.Apellidos);
        localStorage.setItem("Telefono", usuario.Telefono);
        localStorage.setItem("NombreUsuario", usuario.NombreUsuario);
        localStorage.setItem("Correo", usuario.Correo);
        localStorage.setItem("Es_confiable", usuario.Es_confiable);
        localStorage.setItem("Es_administrador", usuario.Es_administrador);
        */
        if (typeof(Storage) !== "undefined") {
            if(localStorage.Nombre != null && localStorage.Apellidos != null &&
            localStorage.Telefono != null && localStorage.Correo != null){
               $('#nombre').attr('value', localStorage.Nombre);
               $('#apellidos').attr('value', localStorage.Apellidos);
               $('#telefono').attr('value', localStorage.Telefono);
               $('#correo').attr('value', localStorage.Correo);
            }
        
        }else{
        toastr.warning("No existen datos asociados. Favor iniciar sesion");
        }
        
    });
    
    
    function validarDatos(){
        
    }
    
    // Valida si el nombre de usuario existe mediante un web service
    function existeNombreUsuario() {
        $('.bloquearBtn').attr('disabled', true);
        if(camposValidos()) { // Valida que los campos necesarios no estén vacíos
            if(compararContrasenas()) { // Valida si las contraseñas son iguales
                if(validarCorreo()) {
                    $('#formEditarUsuario').submit();
                } else { // Si el correo no es válido
                    $('.bloquearBtn').attr('disabled', false);
                    toastr.warning('Correo no válido');
                }
            } else {
                $('.bloquearBtn').attr('disabled', false);
                toastr.warning("Las contraseñas ingresadas no coinciden");
            }
        } else {
            $('.bloquearBtn').attr('disabled', false);
            toastr.warning("Es necesario llenar todos<br>los campos");
        }
    }
    
    function compararContrasenas() {
        if($.trim($('#contrasena').val()) == $.trim($('#contrasena2').val())) {
            return true;
        } else {
            return false;
        }
    }
    
    // Valida el correo
    function validarCorreo() {
        if($.trim($('#correo').val()).length > 0) {
            var x = $.trim($('#correo').val());
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
                return false;
            }
        }
        return true;
    }
    
    
    function camposValidos() {
        if( $.trim($('#nombre').val()).length > 0 && $.trim($('#apellidos').val()).length > 0 
            && $.trim($('#telefono').val()).length > 0 && $.trim($('#correo').val()).length > 0 
            && $.trim($('#contrasena').val()).length > 0 && $.trim($('#contrasena2').val()).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    
    // Valida si el correo de usuario existe al dejar el input (evento blur)
    function existeCorreoBlur() {
        var correo = $.trim($('#correo').val());
        $.ajax({
            url: base_url + 'index.php/WSUsuario/existeCorreo?correo='+correo,
            timeout: 10000,
            dataType: 'jsonp',
            success: function(result) {
                if(result == true) {
                    toastr.error('El correo ingresado ya existe');
                     $('.bloquearBtn').attr('disabled', true);
                }else {
                     $('.bloquearBtn').attr('disabled', false);
                }
            },
            error: function() {
                toastr.warning('Hubo un problema al conectar<br>con la base de datos.<br>Por favor inténtelo de nuevo.');
            }
        });
    }