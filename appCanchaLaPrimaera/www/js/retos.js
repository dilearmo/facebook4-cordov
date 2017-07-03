/* global $ */
/* global localStorage */

var base_url = 'https://cancha-la-primavera-dilearmo.c9users.io/index.php/';

$(document).ready(function() {
    $("#usuario").html('<i class="material-icons letraBlanca">perm_identity</i>' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos'));
    $('.modal').modal();
    listarRetos();
    listarRetosAceptados();
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
                $('#ulRetos').attr('class', 'collapsible');
                $('#ulRetos').attr('data-collapsible', 'accordion');
                $('.collapsible').collapsible();
                $.each(result, function() {
                    var fecha = this.Fecha.split('-');
                    var li = document.createElement('li');
                    $(li).attr('id', 'li' + this.IdDesafio);
                    var divHeader = document.createElement('div');
                    divHeader.setAttribute("class", "collapsible-header");
                    $(divHeader).html('<i class="custom-icon icono-player-waiting"></i><b>Fecha:</b> '
                    + this.NombreDia + ' ' + fecha[2] + '-' + fecha[1]
                    + ' <b>Hora:</b> ' + convertirHora(this.Hora));
                    var divBody = document.createElement('div');
                    var argumentos = this.IdDesafio + ', "' + this.NombreDia + " " + fecha[2] + "-" + fecha[1] + '", "' + convertirHora(this.Hora) + '"';
                    divBody.setAttribute('class', 'collapsible-body');
                    $(divBody).html("<label class='labelInfo'><b>Responsable: </b>" + nombre + " " + apellidos + "</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Equipo: </b>" + this.NombreEquipo + "</label>" 
                    + "<br>" 
                    + "<label class='labelInfo'><b>Cantidad de jugadores: </b>" + this.CantidadDeJugadores +"</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Precio: </b>¢" + this.Precio + "</label>"
                    + "<br>"
                    + "<a class='waves-effect waves-light btn btnEliminarReto' onclick='preguntarSiEliminar(" + argumentos + ")'>"
                    + "<i class='material-icons right'>cancel</i>Cancelar</a>");
                    li.appendChild(divHeader);
                    li.appendChild(divBody);
                    $('#ulRetos').append(li);
                });
            } else {
                var li = document.createElement('li');
                li.setAttribute('id', 'liNoRetos');
                li.innerHTML = '<b>No has propuesto retos aún</b>' +
                    "<br><span>¡Propón un reto para que otros usuarios lo vean y acepten jugar contra tí!</span>";
                $('#ulRetos').append(li);
            }
        }, 
        error: function() {
            toastr.error('Error de conexión con la base de datos');
        }
    });
}

function listarRetosAceptados() {
    var idUsuario = localStorage.getItem('IdUsuario');
    $.ajax({
        url: base_url + 'WSRetos/obtenerRetosAceptadosDelUsuario?IdUsuario=' + idUsuario,
        timeout: 10000,
        dataType: 'jsonp',
        success: function(result) {
            var nombre = localStorage.getItem('Nombre');
            var apellidos = localStorage.getItem('Apellidos');
            if(result != false) {
                $('#ulRetosAceptados').addClass('collapsible');
                $('#ulRetosAceptados').attr('data-collapsible', 'accordion');
                $('.collapsible').collapsible();
                $.each(result, function() {
                    var fecha = this.Fecha.split('-');
                    var li = document.createElement('li');
                    $(li).attr('id', 'li' + this.IdReserva);
                    var divHeader = document.createElement('div');
                    divHeader.setAttribute("class", "collapsible-header");
                    $(divHeader).html('<i class="custom-icon icono-retoA"></i><b>Fecha:</b> '
                    + this.NombreDia + ' ' + fecha[2] + '-' + fecha[1]
                    + ' <b>Hora:</b> ' + convertirHora(this.Hora));
                    var divBody = document.createElement('div');
                    var argumentos = this.IdReserva + ', "' + this.NombreDia + " " + fecha[2] + "-" + fecha[1] + '", "' + convertirHora(this.Hora) + '"';
                    divBody.setAttribute('class', 'collapsible-body');
                    $(divBody).html("<label class='labelInfo'><b>Retador: </b>" + nombre + " " + apellidos + "</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Equipo: </b>" + this.Mi_Equipo + "</label>" 
                    + "<br>" 
                    + "<label class='labelInfo'><b>Cantidad de jugadores: </b>" + this.CantidadDeJugadores +"</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Precio: </b>¢" + this.Precio + "</label>"
                    + "<br>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Contrincante: </b>" + this.NombreContrincante + " " + this.ApellidosContrincante + "</label>"
                    + "<br>"
                    + "<label class='labelInfo'><b>Equipo contrincante: </b>" + this.Equipo_rival + "</label>");
                    li.appendChild(divHeader);
                    li.appendChild(divBody);
                    $('#ulRetosAceptados').append(li);
                });
            } else {
                var li = document.createElement('li');
                li.setAttribute('id', 'liNoRetos');
                li.innerHTML = '<b>Nadie ha aceptadoo tus retos aún</b>' +
                    "<br><span>¡Propón un reto si no lo has hecho aún!</span>";
                $('#ulRetosAceptados').append(li);
            }
        }, 
        error: function() {
            toastr.error('Error al recuperar los retos<br>aceptados');
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

function preguntarSiEliminar(idReto, fecha, hora) {
    $('#btnCancelar').attr('onclick', 'cancelarReto(' + idReto + ')');
    $("#infoRetoEliminando").text('Reto propuesto para el ' + fecha + ' a las ' + hora);
    $('#modalEliminarReto').modal('open');
}

function cancelarReto(idReto) {
    $.ajax({
        url: base_url + 'WSRetos/cancelarReto?idReto=' + idReto,
        timeout: 10000,
        dataType: 'jsonp',
        success: function(result) {
            if(result == true) {
                $('#li' + idReto).remove();
                toastr.success('Reto cancelado');
            } else {
                toastr.error('Error al cancelar el reto');
            }
        },
        error: function() {
            toastr.error('Error de conexión con la base de datos');
        }
    });
}

function mostrarListaAceptados() {
    $('#verRetosProp').removeClass('listaActiva');
    $('#verRetosPropAcep').addClass('listaActiva');
    
    $('#ulRetos').addClass('listaHidde');
    $('#ulRetosAceptados').removeClass('listaHidde');
}

function mostrarListaPropuestos() {
    $('#verRetosPropAcep').removeClass('listaActiva');
    $('#verRetosProp').addClass('listaActiva');
    
    $('#ulRetosAceptados').addClass('listaHidde');
    $('#ulRetos').removeClass('listaHidde');
}