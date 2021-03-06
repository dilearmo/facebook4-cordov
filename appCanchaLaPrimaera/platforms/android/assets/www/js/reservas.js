/* global $ */
/* global localStorage */
/* global location */
/* global toastr */

var base_url = 'https://cancha-la-primavera-dilearmo.c9users.io/index.php/';

$(document).ready(function() {
    $("#usuario").html('<i class="material-icons letraBlanca">perm_identity</i>' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos'));
    $('.modal').modal();
    listarReservas();
    
    /*if (window.history && window.history.pushState) {
        window.history.pushState('forward', null, './#forward');
        $(window).on('popstate', function() {
            alert('Back button was pressed.');
        });
    }*/
});

function listarReservas() {
    var idUsuario = localStorage.getItem('IdUsuario');
    $.ajax({
        url: base_url + 'WsReservas/obtnerReservasporUsuario?IdUsuario=' + idUsuario,
        timeout: 10000,
        dataType: 'jsonp',
        success: function(result) {
            var nombre = localStorage.getItem('Nombre');
            var apellidos = localStorage.getItem('Apellidos');
            if(result != false) {
                $('#ulReservas').attr('class', 'collapsible');
                $('#ulReservas').attr('data-collapsible', 'accordion');
                $('.collapsible').collapsible();
                $.each(result, function() {
                    var fecha = this.Fecha.split('-');
                    var li = document.createElement('li');
                    var divHeader = document.createElement('div');
                    divHeader.setAttribute("class", "collapsible-header");
                    $(divHeader).html('<i class="custom-icon icono-reserva"></i><b>Fecha:</b> '
                    + this.NombreDia + ' ' + fecha[2] + '-' + fecha[1]
                    + ' <b>Hora:</b> ' + convertirHora(this.Hora));
                    var divBody = document.createElement('div');
                    var argumentos = this.idReserva + ', "' + this.NombreDia + " " + fecha[2] + "-" + fecha[1] + '", "' + convertirHora(this.Hora) + '"';
                    divBody.setAttribute('class', 'collapsible-body');
                    $(divBody).html("<label class='labelInfo'><b>Responsable: </b>" + nombre + " " + apellidos + "</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Equipo: </b>" + this.Mi_Equipo + "</label>" 
                    + "<br>" 
                    + "<label class='labelInfo'><b>Cantidad de jugadores: </b>" + this.CantidadDeJugadores +"</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Precio: </b>¢" + this.Precio + "</label>"
                    + "<br>"
                    + "<a class='waves-effect waves-light btn btnEliminarReto' onclick='preguntarSiEliminar(" + argumentos + ")'>"
                    + "<i class='material-icons right'>cancel</i>Cancelar</a>");
                    li.appendChild(divHeader);
                    li.appendChild(divBody);
                    $('#ulReservas').append(li);
                });
            } else {
                var li = document.createElement('li');
                li.setAttribute('id', 'liNoRetos');
                li.innerHTML = '<b>No has hecho ningúna reserva aún</b>' +
                    "<br><span>¡Haz reservas y asegura tu espacio en la mejor cancha de Grecia!</span>";
                $('#ulReservas').append(li);
            }
        }, 
        error: function(xhr, status, error) {
            toastr.error('Error de conexión al servidor');
             // var err = eval("(" + xhr.responseText + " " + status + " " + error);
            //  alert(err.Message);
        }
    });
}

function convertirHora(hora) {
    switch (hora) {
        case '12':
            hora += ':00md';
            break;
        case '13':
            hora = '1:00pm';
            break;
        case '14':
           hora = '2:00pm';
            break;
        case '15':
            hora = '3:00pm';
            break;
        case '16':
            hora = '4:00pm';
            break;
        case '17':
            hora = '5:00pm';
            break;
        case '18':
            hora = '6:00pm';
            break;
        case '19':
            hora = '7:00pm';
            break;
        case '20':
            hora = '8:00pm';
            break;
        case '21':
            hora = '9:00pm';
            break;
        case '22':
            hora = '10:00pm';
            break;
        case '23':
            hora = '11:00pm';
            break;
        default:
            hora += ':00am';
    }
    return hora;
        
}

function preguntarSiEliminar(idReserva, fecha, hora) {
   
    $("#infoReservaEliminando").text('Reserva hecha  para el ' + fecha + ' a las ' + hora);
    $('#btnCancelar').attr('onclick','eliminar('+ idReserva +')');
    $('#modalEliminarReserva').modal('open');
    
}

function eliminar(i) {
  $(function() {

        $.ajax({
            type: 'GET',
            url: base_url+'WsReservas/cancelarApp?id='+i,
             dataType: 'jsonp',
              timeout: 10000,
            success: function(response) {
                toastr.success('Reserva cancelada con éxito');
               location.reload();
            },
            error: function(error) {
                toastr.error('Error al cancelar la reserva');
            }
        });
   
});
}
