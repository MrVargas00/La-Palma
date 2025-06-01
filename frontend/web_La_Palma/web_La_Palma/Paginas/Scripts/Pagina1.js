jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
});

let accionActual = '';

function mostrarFormulario(accion) {
    accionActual = accion;
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('formTitle').textContent = accion + ' Servicio';

    // Limpiar formulario
    document.getElementById('frmServicios').reset();

    // Si es consultar o eliminar, podrías pre-cargar datos
    if (accion === 'CONSULTAR') {
        // Hacer campos de solo lectura
        const inputs = document.querySelectorAll('#frmServicios input, #frmServicios select, #frmServicios textarea');
        inputs.forEach(input => input.setAttribute('readonly', true));
    } else {
        // Quitar readonly
        const inputs = document.querySelectorAll('#frmServicios input, #frmServicios select, #frmServicios textarea');
        inputs.forEach(input => input.removeAttribute('readonly'));
    }
}

function cancelarAccion() {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('welcomeSection').style.display = 'block';
    accionActual = '';
}

function confirmarAccion() {
    // Aquí irían las validaciones y la lógica del CRUD
    alert('Acción: ' + accionActual + ' confirmada');
    // Después de procesar, volver a la pantalla principal
    cancelarAccion();
}