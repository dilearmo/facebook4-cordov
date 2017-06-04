/* global $ */
/* global toastr */
/* global localStorage */

/* Login con Facebook */

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if(d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "facebook-jssdk"));

/* Fin login con Facebook */

var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";

$(document).ready(function() {
    facebookConnectPlugin.login('email, public_profile', 
    function(result) {
        toastr.info('success ' + result.status);
    }, function(result) {
        toastr.info('error ' + result.status);
    });
    
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario != undefined && nombreUsuario != "") {
            window.location.href = 'home.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
    
    var app_id = '1061872230622284'; // También va en el config.xml con el nombre de la app de ese id
    var scopes = 'email, public_profile';
    
    window.fbAsyncInit = function() {
        FB.init({
            appId      : app_id,
            cookie     : true,
            status     : true,
            xfbml      : true,
            version    : 'v2.9'
            
        });
        
        
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response, function() {
                
            });
        });  
    }
    
    var statusChangeCallback = function(response, callback) {
        toastr.info('statudChangeCallback');
        if(response.status === 'connected') {
            getFacebookData();
        } else {
            //document.getElementById('status').innerHTML = 'Por favor, inicie sesión en Facebook';
            callback(false);
        }
    }
    
    var checkLoginState = function(callback) {
        toastr.info('checkLoginState');
        FB.getLoginStatus(function(response) {
            toastr.info('FB.getLoginStatus');
            statusChangeCallback(response, function(data) {
                callback(data);
            });
        });  
    }
    
    var getFacebookData = function() {
        toastr.info('getFacebookData');
        FB.api('/me', {fields: 'name,email'}, function(response) {
            // guardar sesi[on]
            toastr.info('FB.api obteniendo datos');
            toastr.error('Bienvenido ' + response.name + ' ' + response.id + ' ' + response.email);
            var img = document.createElement('img');
            img.setAttribute('src', 'http://graph.facebook.com/' + response.id + '/picture/type=large');
            $("#login").append(img);
        });
    }
    
    var facebookLogin = function() {
        toastr.info('facebookLogin');
        checkLoginState(function(response) {
            if(!response) {
                FB.login(function(response) {
                    if(response.status === 'connected') {
                        getFacebookData();
                    }
                }, { scope: scopes });
            } else {
                toastr.info('No respuesta en facebookLogin');
            }
        });
    }
    
    var facebookLogout = function() {
        FB.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                if(confirm('¿Está seguro(a) de que desea cerrar sesión?')) {
                    FB.logout(function(response) {
                        // Cerró sesión
                    });
                } else {
                    return false;
                }
            }
        }); 
    }
    
    $(document).on('click', '#FBlogin', function(e) {
        e.preventDefault();
        facebookLogin();
    });
    
    $(document).on('click', '#FBlogout', function(e) {
        e.preventDefault();
        facebookLogout();
    });
    
});

function existeNombreUsuario() {
    var contrasena = $("#contrasena").val().trim();
    var nombreUsuario = $("#nombreUsuario").val().trim();
    if(nombreUsuario.length > 0 && contrasena.length > 0) { 
        $.ajax({
            url: base_url + "WSUsuario/existeNombreUsuario?nombreUsuario=" + nombreUsuario,
            timeout: 10000,
            dataType: 'jsonp',
            success: function(response) {
                if(response == true) {
                    validarCredenciales(nombreUsuario, contrasena);
                } else {
                    toastr.error("El nombre de usuario<br><b>" + nombreUsuario + "</b><br>no existe");
                }
            },
            error: function(a, b, c) {
                toastr.error("Error de conexión");
            }
        });
    } else {
        toastr.warning("Indique su nombre de usuario<br>y contraseña");
    }
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




// ********************* JS del template *****************************

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

// *************************** Fin JS del template ************************************