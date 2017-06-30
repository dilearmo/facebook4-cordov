/* global $ */
/* global localStorage */

var base_url = 'https://cancha-la-primavera-dilearmo.c9users.io/index.php/';

$(document).ready(function() {
    $("#usuario").html('<i class="material-icons letraBlanca">perm_identity</i>' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos'));
    $('.modal').modal();
    listarRetosPropuestos();
});

function listarRetosPropuestos() {
    var idUsuario = localStorage.getItem('IdUsuario');
    $.ajax({
        url: base_url + 'WSRetos/obtnerRetosPropuestos?IdUsuario=' + idUsuario,
        timeout: 10000,
        dataType: 'jsonp',
        success: function(result) {
            if(result != false) {
                $('#ulRetosDisponibles').attr('class', 'collapsible');
                $('#ulRetosDisponibles').attr('data-collapsible', 'accordion');
                $('.collapsible').collapsible();
                $.each(result, function() {
                    var fecha = this.Fecha.split('-');
                    var li = document.createElement('li');
                    $(li).attr('id', 'li' + this.IdDesafio);
                    var divHeader = document.createElement('div');
                    divHeader.setAttribute("class", "collapsible-header");
                    $(divHeader).html('<i class="material-icons">compare_arrows</i><b>Fecha:</b> '
                    + this.NombreDia + ' ' + fecha[2] + '-' + fecha[1]
                    + ' <b>Hora:</b> ' + convertirHora(this.Hora));
                    var divBody = document.createElement('div');
                    var argumentos = this.IdDesafio + ', "' + this.NombreDia + " " + fecha[2] + "-" + fecha[1] + '", "' + convertirHora(this.Hora) + '"';
                    divBody.setAttribute('class', 'collapsible-body');
                    $(divBody).html("<label class='labelInfo' id='retador" + this.IdDesafio + "'><b>Retador: </b>" + this.NombreU + " " + this.ApellidosU + "</label>"
                    + "<br>"
                    + "<label class='labelInfo' id='equipo" + this.IdDesafio + "'><b>Equipo: </b>" + this.NombreEquipo + "</label>" 
                    + "<br>" 
                    + "<label class='labelInfo' id='cantidadJ" + this.IdDesafio + "'><b>Cantidad de jugadores: </b>" + this.CantidadDeJugadores +"</label>"
                    + "<br>"
                    + "<label class='labelInfo' id='precio" + this.IdDesafio + "'><b>Precio: </b>¢" + this.Precio + "</label>"
                    + "<br>"
                    + "<a class='waves-effect waves-light btn btnEliminarReto' onclick='preguntarSiAceptar(" + argumentos + ")'>"
                    + "<i class='material-icons right'>sentiment_very_satisfied</i>Aceptar reto</a>");
                    li.appendChild(divHeader);
                    li.appendChild(divBody);
                    $('#ulRetosDisponibles').append(li);
                });
            } else {
                var li = document.createElement('li');
                li.setAttribute('id', 'liNoRetos');
                li.innerHTML = '<b>No hay retos disponibles en este momento</b>' +
                    '<br><span>¡Vuelve más tarde por un reto!</span>';
                $('#ulRetosDisponibles').append(li);
            }
        }, 
        error: function() {
            toastr.error('Error de conexión con la base de datos');
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

/*function preguntarSiAceptar(idReto, fecha, hora) {
    $('#btnAceptar').attr('onclick', 'aceptarReto(' + idReto + ')');
    $("#infoRetoAceptando").text('El reto será el ' + fecha + ' a las ' + hora);
    $('#modalAceptarReto').modal('open');
}*/

function preguntarSiAceptar(idReto, fecha, hora) {
    var nombreUsuario = localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos');
    var nomEquipo = $('#equipo' + idReto).html();
    var cantJug = $('#cantidadJ' + idReto).html();
    var precio = $('#precio' + idReto).html();
    var retador = $('#retador' + idReto).html();
    $('#btnAceptar').attr('onclick', 'aceptarReto(' + idReto + ')');
    $('#btnNoAceptar').attr('onclick', 'borrarValorEquipoRival()')
    $('#resumenResponsable').html(retador);
    $('#resumenEquipo').html(nomEquipo);
    $('#resumenCantidadJugadores').html(cantJug);
    $('#resumenFecha').html('<b>Fecha y hora:</b> ' + fecha + ' - ' + hora);
    $('#resumenPrecio').html(precio);
    $('#resumenContrincante').html('<b>Contrincante:</b> ' + nombreUsuario);
    $('#equipoRival').val('');
    $('#modalAceptarReto').modal('open');
}

function aceptarReto(idReto) {
    var idUsuario = localStorage.getItem('IdUsuario');
    var equipoRival = $('#equipoRival').val().trim();
    if(equipoRival.length > 0) {
        $.ajax({
            url: base_url + 'WSRetos/aceptarReto?idReto=' + idReto + '&idContrincante=' + idUsuario + '&equipoRival=' + equipoRival,
            timeout: 10000,
            dataType: 'jsonp',
            success: function(result) {
                if(result == true) {
                    $('#li' + idReto).remove();
                    $('#modalAceptarReto').modal('close');
                    toastr.success('¡Reto aceptado!');
                    if($('#ulRetosDisponibles').children().length <= 0) {
                        var li = document.createElement('li');
                        li.setAttribute('id', 'liNoRetos');
                        li.innerHTML = '<b>No hay retos disponibles en este momento</b>' +
                            '<br><span>¡Vuelve más tarde por un reto!</span>';
                        $('#ulRetosDisponibles').append(li);
                    }
                } else {
                    toastr.error('Error al aceptar el reto');
                }
            },
            error: function() {
                toastr.error('Error de conexión con el servidor');
            }
        });
    } else {
        toastr.error('Debe especificar el nombre de su equipo');
    }
}