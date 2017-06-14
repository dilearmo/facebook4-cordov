/* global $ */
/* global localStorage */

var base_url = 'https://cancha-la-primavera-dilearmo.c9users.io/index.php/';

$(document).ready(function() {
    $("#usuario").html('<i class="material-icons letraBlanca">perm_identity</i>' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos'));
    listarRetos();
});

function listarRetos() {
    var idUsuario = localStorage.getItem('IdUsuario');
    $.ajax({
        url: base_url + 'WSRetos/obtnerRetosporUsuario?IdUsuario=' + idUsuario,
        timeout: 10000,
        dataType: 'jsonp',
        success: function(result) {
            var nombre = localStorage.getItem('Nombre');
            var apellidos = localStorage.getItem('Apellidos');
            if(result != false) {
                $.each(result, function() {
                    var fecha = this.Fecha.split('-');
                    var li = document.createElement('li');
                    var divHeader = document.createElement('div');
                    divHeader.setAttribute("class", "collapsible-header");
                    $(divHeader).html('<i class="material-icons">compare_arrows</i><b>Fecha:</b> '
                    + this.NombreDia + ' ' + fecha[2] + '-' + fecha[1] + '-' + fecha[0]
                    + ' <b>Hora:</b> ' + this.IdHoraReservable);
                    var divBody = document.createElement('div');
                    divBody.setAttribute('class', 'collapsible-body');
                    $(divBody).html("<label class='labelInfo'><b>Responsable: </b>" + nombre + " " + apellidos + "</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Equipo: </b>" + this.NombreEquipo + "</label>" 
                    + "<br>" 
                    + "<label class='labelInfo'><b>Cantidad de jugadores: </b>" + this.CantidadDeJugadores +"</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Precio: </b>¢" + this.Precio + "</label>");
                    li.appendChild(divHeader);
                    li.appendChild(divBody);
                    $('#ulRetos').append(li);
                });
            }
        }, 
        error: function() {
            toastr.error('Error de conexión con la base de datos');
        }
    });
}