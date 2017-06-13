/* global $ */
/* global toastr */
/* global localStorage */
/* global Spinner */
var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";
$(document).ready(function() {

    
    $('select').material_select();
    $('.modal').modal();


    var opts = {
        lines: 17 // The number of lines to draw
            ,
        length: 48 // The length of each line
            ,
        width: 16 // The line thickness
            ,
        radius: 84 // The radius of the inner circle
            ,
        scale: 1 // Scales overall size of the spinner
            ,
        corners: 1 // Corner roundness (0..1)
            ,
        color: '#000' // #rgb or #rrggbb or array of colors
            ,
        opacity: 0.25 // Opacity of the lines
            ,
        rotate: 0 // The rotation offset
            ,
        direction: 1 // 1: clockwise, -1: counterclockwise
            ,
        speed: 1 // Rounds per second
            ,
        trail: 60 // Afterglow percentage
            ,
        fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            ,
        zIndex: 2e9 // The z-index (defaults to 2000000000)
            ,
        className: 'spinner' // The CSS class to assign to the spinner
            ,
        top: '50%' // Top position relative to parent
            ,
        left: '52%' // Left position relative to parent
            ,
        shadow: false // Whether to render a shadow
            ,
        hwaccel: false // Whether to use hardware acceleration
            ,
        position: 'absolute' // Element positioning
    }



    //  $('#horario')
    // .hide()  // Hide it initially
    // .ajaxStart(function() {
    //     $(this).show();
    // })
    // .ajaxStop(function() {
    //     $(this).hide();
    // });


    $(function() {
        $('#popupDatepicker').datepick();
        // $("#inlineDatepicker").datepicker({ minDate: 0 });  

        $('#inlineDatepicker').datepick({
            onSelect: showDate,
            language: 'es-PE',
            minDate: 0,
            dateFormat: "mm/dd/yy",
            minDate: 0,
            maxDate: 30,
            //numberOfMonths: 2,
            closeText: 'Cerrar',
            prevText: '<i class="small material-icons">keyboard_arrow_left</i>',
            nextText: '<i class="small material-icons">keyboard_arrow_right</i>',
            todayText: '<i class="small material-icons">av_timer</i>',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''

        });
    });

    function showDate(date) {
        formatearFecha(date);
        // alert('La fecha elegida es ' + date);
        //var spinner = new Spinner().spin()
        //$('#calendario').appendChild(spinner.el)
        //////////var target = document.getElementById('calendario')
        /////////var spinner = new Spinner(opts).spin(target);
        //$('#inlineDatepicker').hide()
        //$('#horario').hide();
        /**************************var millisecondsToWait = 2000;
        setTimeout(function() {
            spinner.stop();
            //$('#inlineDatepicker').show();
            //$('#horario').show();
        
            window.scroll(0, findPos(document.getElementById("horario")));
         
        }, millisecondsToWait);*/
          
    }


    $('.datepick-month-header > select:first-child').attr('disabled', 'true');
});

function formatearFecha(fecha) {
    var array = fecha.toString().split(' ');
    var dia = 'dia';
    var diaFecha = array[2];
    var mes = 'mes';
    var anno = array[3];
    // Saca el día
    switch (array[0]) {
        case 'Mon':
            dia = 'Lunes';
            break;
        case 'Tue':
            dia = 'Martes';
            break;
        case 'Wed':
            dia = 'Miercoles';
            break;
        case 'Thu':
            dia = 'Jueves';
            break;
        case 'Fri':
            dia = 'Viernes';
            break;
        case 'Sat':
            dia = 'Sabado';
            break;
        case 'Sun':
            dia = 'Domingo';
            break;
        default:
            // code
    }
    // Saca el mes
    switch (array[1]) {
        case 'Ene':
            mes = '01';
            break;
        case 'Feb':
            mes = '02';
            break;
        case 'Mar':
            mes = '03';
            break;
        case 'Abr':
            mes = '04';
            break;
        case 'May':
            mes = '05';
            break;
        case 'Jun':
            mes = '06';
            break;
        case 'Jul':
            mes = '07';
            break;
        case 'Ago':
            mes = '08';
            break;
        case 'Sep':
            mes = '09';
            break;
        case 'Oct':
            mes = '10';
            break;
        case 'Nov':
            mes = '11';
            break;
        case 'Dic':
            mes = '12';
            break;
        default:
            // code
    }
    listarHorasDisponibles(dia, anno + '-' + mes + '-' + diaFecha);
}

function limpiarModal() {
    $('.modal-content div').remove();
    $('#horaPrecioTemp').val('-1');
    $('#fechaSeleccTemp').val('-1');
}
/* web services*/


function listarHorasDisponibles(dia, fecha) {
    $.ajax({
        url: base_url + 'WSRetos/listarHorasDisponibles?dia=' + dia + '&fecha=' + fecha,
        timeout: 10000,
        dataType: 'jsonp',
        success: function(response) {
            $('#btnSelecHora').attr('disabled', 'disabled');
            $('#fechaSeleccTemp').val(fecha);
            $('#diaSelecTemp').val(dia);
            if (response != false) {
                $('#mensajeModal').text('Seleccione la hora en la que desea proponer el reto');
                $('.modal-content div').remove();
                var i = 0;
                var rowAnterior;
                $.each(response, function() {
                    var div = document.createElement('div');
                    div.setAttribute('onclick', 'seleccionarHora(this)');
                    var inputHidden = document.createElement('input');
                    inputHidden.setAttribute('type', 'hidden');
                    $(inputHidden).val(this.Id);
                    var divContent = 'Hora: ' + convertirHora(this.Hora) + '<br>' + 'Precio: ¢' + this.Precio;
                    $(div).html(divContent);
                    div.appendChild(inputHidden);
                    if(i % 2 == 0) {
                        var row = document.createElement('div');
                        row.setAttribute('class', 'row');
                        div.setAttribute('class', 'cuadrosHoras horitas');
                        row.appendChild(div);
                        rowAnterior = row;
                        if(i == response.length - 1) {
                            $('.modal-content').append(rowAnterior);
                        }
                    } else {
                        div.setAttribute('class', 'cuadrosHoras espacioEntreHoras horitas');
                        rowAnterior.appendChild(div);
                        $('.modal-content').append(rowAnterior);
                    }
                    i++;
                });
                $('#modalHoras').modal('open');
            }
            else {
                $('#btnSelecHora').attr('disabled', 'disabled');
                $('#mensajeModal').text('No hay horas disponibles en el día seleccionado');
                return false;
            }
        },
        error: function() {
            $('#btnSelecHora').attr('disabled', 'disabled');
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

function seleccionarHora(div) {
    $('.modal-content div').attr('active', 'false');
    $(div).attr('active', 'true');
    $('#horaPrecioTemp').val($(div).children('input').val());
    $('#btnSelecHora').removeAttr('disabled');
}

function seleccionarFechaDef() {
    $('#horaSeleccionada').val($('#horaPrecioTemp').val());
    $('#diaSeleccionado').val($('#diaSelecTemp').val());
    $('#fechaSeleccionada').val($('#fechaSeleccTemp').val());
    $('#fechaPreview').val($('#diaSeleccionado').val() + ' ' + $('#fechaSeleccionada').val());
    $('#fechaPreview').focusin();
    $('#fechaPreview').attr('content', 'filled');
}

function mostrarResumen() {
    $('#resumenResponsable').html('<b>Responsable:</b> ' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos'));
    $('#resumenEquipo').html('<b>Equipo:</b> ' + $('#nombreEquipo').val());
    $('#resumenCantidadJugadores').html('<b>Cantidad de jugadores:</b> ' + $('#cantidadJugadores').val());
    $('#resumenFecha').html('<b>Fecha:</b> ' + $('#fechaPreview').val());
    $('#resumenPrecio').html('<b>Precio:</b> ¢32131');
    $('#modalResumen').modal('open');
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}
