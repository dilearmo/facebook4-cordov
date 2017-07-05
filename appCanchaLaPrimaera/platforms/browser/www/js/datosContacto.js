var base_url = "https://cancha-la-primavera-dilearmo.c9users.io/index.php/";

$(document).ready(function() {
    $("#usuario").html('<i class="material-icons letraBlanca">perm_identity</i>' + localStorage.getItem('Nombre') + ' ' + localStorage.getItem('Apellidos'));
    cargarDatosContacto();
});

function cargarDatosContacto() {
    $.ajax({
        url: base_url + 'WSDatosContacto/obtener',
        dataType: 'jsonp',
        timeout: 10000,
        success: function(result) {
            if(result == false) {
                toastr.error('Ha ocurrido un error al cargar los datos');
            } else {
                if(result.telefono != null) {
                    $('#telefono').text(result.telefono);
                } else {
                    $('#telefono').text('No disponible');
                }
                if(result.correo != null) {
                    $('#correo').text(result.correo);
                } else {
                    $('#correo').text('No disponible');
                }
                if(result.youtube != null) {
                    $('#youtube').html('<a href="' + result.youtube + '">Cancha La Prmavera');
                } else {
                    $('#youtube').text('No disponible');
                }
            }
        },
        error: function() {
            toastr.error('Ha ocurrido un error al cargar los datos');
        }
    });
}
