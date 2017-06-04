/* global $ */
/* global toastr */
/* global localStorage */
/* global Spinner */
var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";
$(document).ready(function() {





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
            prevText: '<i class="small material-icons">fast_rewind</i>',
            nextText: '<i class="small material-icons">fast_forward</i>',
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
        // alert('La fecha elegida es ' + date);
        //var spinner = new Spinner().spin()
        //$('#calendario').appendChild(spinner.el)
        var target = document.getElementById('calendario')
        var spinner = new Spinner(opts).spin(target);
        $('#inlineDatepicker').hide()
        $('#horario').hide();
        var millisecondsToWait = 2000;
        setTimeout(function() {
            spinner.stop();
            $('#inlineDatepicker').show();
            $('#horario').show();
        
            window.scroll(0, findPos(document.getElementById("horario")));
         
        }, millisecondsToWait);
          
    }


});


/* web services*/


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
        error: function() {
            toastr.error("Error al registrar");
            //  window.alert("AJAX error in request: " + JSON.stringify(err, null, 2) + err.message);
            //  alert('Error message: '+msg.message+'\nURL: '+url+'\nLine Number: '+linenumber);
        }


    });
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
