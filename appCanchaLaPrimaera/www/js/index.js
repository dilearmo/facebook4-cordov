/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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


/* global $ */
/* global toastr */
/* global facebookConnectPlugin */
/* global localStorage */
/* global target */

var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";
var permisos = 'email,first_name,last_name';

$(document).ready(function() {
    $('#btnRegistroTradicional').hide();
    
    if (typeof(Storage) !== "undefined") {
        var nombreUsuario = localStorage.getItem('NombreUsuario');
        if(nombreUsuario != undefined && nombreUsuario != "") {
            window.location.href = 'home.html';
        }
    } else {
        toastr.info("Lo sentimos,<br>su teléfono no es<br>compatible con esta<br>aplicación");
    }
});

function checkFBLoginStatus(request) {
    console.info('checking status');
    facebookConnectPlugin.getLoginStatus(
        function(result) {
            if(request === 'login') {
                if(result.status === 'connected') {
                    console.info('La sesi[on ya est[a abierta');
                } else if(result.status === 'unknown' || result.status === 'not_authorized'){
                    console.info('Cesi[on cerrada, logueando...');
                    fbLogin('login');
                }
                getFacebookData('login');
            }
            
            if(request === 'logout') {
                if(result.status === 'connected') {
                    console.info('Conectado, saliendo...');
                    fbLogout();
                } else if(result.status === 'unknown' || result.status === 'not_authorized'){
                    console.info('La sesi[on ya est[a cerrada');
                }
            }
            
            if(request === 'registro') {
                //console.log('Status to registro');
                fbLogin('registro');
                getFacebookData('registro');
                /*if(existeNombreUsuario(result.id)) {
                    console.info('id ' + result.id);
                    toastr.info('Usted ya se encuentra registrado<br>Diríjase a la pestaña<br>de login');
                } else {
                    getFacebookData('registro');
                }*/
            }
        },
        function() {
            console.error('Error al checar el status');
            return false;
        }
    );
}

function fbLogin(request) {
    console.info('Logueando');
    facebookConnectPlugin.login(
        [permisos], 
        function(result) {
            // success
            console.log('logueo exitoso');
        },
        function() {
            // error
            console.log('logueo fallido');
        }
    );
}

function fbLogout() {
    console.info('Logout');
    console.info('Cerrando sesi[on');
    facebookConnectPlugin.logout( 
        function(result) {
            // success
            // redirigir
            console.info('Sesion cerrada');
            
        },
        function() {
            // error
            console.info('No se ha podido cerrar sesi[on');
        }
    );
}

function getFacebookData(request) {
    facebookConnectPlugin.api('me?fields=first_name,last_name,name,email', ['email'],
        function(datos) {
            console.info('Bienvenido(a) ' + datos.name);
            if(request === "registro") {
                if(existeNombreUsuario(datos.id)) {
                    console.info('id ' + datos.id);
                    toastr.info('Usted ya se encuentra registrado<br>Diríjase a la pestaña<br>de login');
                } else {
                    console.log('Cargando datos registro');
                    $("#nombreUsuarioRegistro").hide();
                    $("#btnRegistroFB").hide();
                    $("#btnRegistroTradicional").show();
                     $("#nombre").focusin();
                    $("#nombre").val(datos.first_name);
                     $("#apellidos").focusin();
                    $("#apellidos").val(datos.last_name);
                    if(datos.email != undefined) {
                        $("#email").focusin();
                        $("#email").val(datos.email);
                        
                    }
                }
            }
            if(request === "login") {
                //Se loguea
                console.log('En login');
            }
        },
        function(error) {
            alert('Error ' + error);
        }
    );
}


function existeNombreUsuario(request) {
    var contrasena;
    var nombreUsuario;
    if(request != 'login') {
        contrasena = '##############';
        nombreUsuario = request;
    } else {
        contrasena = $("#contrasena").val().trim();
        nombreUsuario = $("#nombreUsuario").val().trim();
    }
    if(nombreUsuario.length > 0 && contrasena.length > 0) { 
        $.ajax({
            url: base_url + "WSUsuario/existeNombreUsuario?nombreUsuario=" + nombreUsuario,
            timeout: 10000,
            dataType: 'jsonp',
            success: function(response) {
                    if(request != 'login') {
                        return response;
                    } else {
                        if(response == true) {
                            validarCredenciales(nombreUsuario, contrasena);
                        } else {
                            toastr.error("El nombre de usuario<br><b>" + nombreUsuario + "</b><br>no existe");
                        }
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

function mostrarRegistroTradicional() {
    $("#btnRegistroTradicional").hide();
    $('#nombreUsuarioRegistro').show();
    $('#btnRegistroFB').show();
    $("#email").val('');
    $("#nombre").val('');
    $("#apellidos").val('');
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
