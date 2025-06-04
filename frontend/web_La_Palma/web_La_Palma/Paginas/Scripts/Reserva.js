var BaseUrl = "http://localhost:63533/";

var metodoActual = null;

function MostrarDatosEntrada() {
    $("#datos_entrada").show();
    $("#id_botones").hide();
}

function MostrarBotones() {
    $("#btnCheck-in").show();
    $("#btnCheck-out").show();
}

function OcultarBotones() {
    $("#btnCheck-in").hide();
    $("#btnCheck-out").hide();
}

function OcultarDatosEntrada() {
    $("#datos_entrada").hide();
    $("#id_botones").show();
    // Limpiar los campos del formulario
    $("#frmReserva")[0].reset();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaReservas() {
    let URL = BaseUrl + "api/Reserva/ListarReservas"
    LlenarTablaXServiciosAuth(URL, '#tblReservas');
}

function LlenarComboPaquetes() {
    let URL = BaseUrl + "api/Paquete/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboPaqueteReserva');
}

function LlenarComboHabitaciones() {
    let URL = BaseUrl + "api/Habitacion/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboHabitacion');
}

function LlenarComboDocumentoCliente() {
    let URL = BaseUrl + "api/Cliente/LlenarComboDocumento"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboDocumento');
}

function ConfigurarModoInsertar() { // Función para configurar el modo insertar
    $("#txtIDReserva").val(''); // Limpiar el ID
    $("#txtIDReserva").prop('disabled', true); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#cboDocumento").val('1');
    $("#cboDocumento").prop('disabled', false);
    $("#txtFechaReserva").val('');
    $("#txtFechaReserva").prop('disabled', false);
    $("#txtFechaEntrada").val('');
    $("#txtFechaEntrada").prop('disabled', false);
    $("#chkActivoReserva").prop('checked', false);
    $("#chkActivoReserva").prop('disabled', false);
    $("#txtFechaSalida").val('');
    $("#txtFechaSalida").prop('disabled', false);
    $("#txtNumeroHuespedes").val('');
    $("#txtNumeroHuespedes").prop('disabled', false)
    $("#cboPaqueteReserva").val('1');
    $("#cboPaqueteReserva").prop('disabled', false);
    $("#cboHabitacion").val('1');
    $("#cboHabitacion").prop('disabled', false);
    $("#txtObservacionesReserva").val('1');
    $("#txtObservacionesReserva").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEdicion() {
    $("#txtIDReserva").val(''); // Limpiar el ID
    $("#txtIDReserva").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#cboDocumento").val('1');
    $("#cboDocumento").prop('disabled', false);
    $("#txtFechaReserva").val('');
    $("#txtFechaReserva").prop('disabled', false);
    $("#txtFechaEntrada").val('');
    $("#txtFechaEntrada").prop('disabled', false);
    $("#chkActivoReserva").prop('checked', false);
    $("#chkActivoReserva").prop('disabled', false);
    $("#txtFechaSalida").val('');
    $("#txtFechaSalida").prop('disabled', false);
    $("#txtNumeroHuespedes").val('');
    $("#txtNumeroHuespedes").prop('disabled', false)
    $("#cboPaqueteReserva").val('1');
    $("#cboPaqueteReserva").prop('disabled', false);
    $("#cboHabitacion").val('1');
    $("#cboHabitacion").prop('disabled', false);
    $("#txtObservacionesReserva").val('1');
    $("#txtObservacionesReserva").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEliminar() {
    $("#txtIDReserva").val(''); // Limpiar el ID
    $("#txtIDReserva").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#cboDocumento").val('1');
    $("#cboDocumento").prop('disabled', true);
    $("#txtFechaReserva").val('');
    $("#txtFechaReserva").prop('disabled', true);
    $("#txtFechaEntrada").val('');
    $("#txtFechaEntrada").prop('disabled', true);
    $("#chkActivoReserva").prop('checked', true);
    $("#chkActivoReserva").prop('disabled', true);
    $("#txtFechaSalida").val('');
    $("#txtFechaSalida").prop('disabled', true);
    $("#txtNumeroHuespedes").val('');
    $("#txtNumeroHuespedes").prop('disabled', true)
    $("#cboPaqueteReserva").val('1');
    $("#cboPaqueteReserva").prop('disabled', true);
    $("#cboHabitacion").val('1');
    $("#cboHabitacion").prop('disabled', true);
    $("#txtObservacionesReserva").val('1');
    $("#txtObservacionesReserva").prop('disabled', true);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

async function Consultar() {
    let ID = $("#txtIDReserva").val();
    let URL = BaseUrl + "api/Reserva/Consultar?ID=" + ID;
    const reserva = await ConsultarServicioAuth(URL);
    if (reserva == null) {
        // No existe, se borran los datos
        OcultarDatosEntrada();
        $("#dvMensaje").html("La reserva no existe");
        $("#dvMensaje").show();

    } else {
        $("#txtIDReserva").val(reserva.id_reserva);
        $("#cboDocumento").val(reserva.documento_cliente);
        $("#txtFechaReserva").val(reserva.fecha_reserva ? reserva.fecha_reserva.split('T')[0] : '');
        $("#txtFechaEntrada").val(reserva.fecha_llegada ? reserva.fecha_llegada.split('T')[0] : '');
        $("#chkActivoReserva").prop('checked', reserva.activo);
        $("#txtFechaSalida").val(reserva.fecha_salida ? reserva.fecha_salida.split('T')[0] : '');
        $("#txtNumeroHuespedes").val(reserva.numero_huespedes);
        $("#cboPaqueteReserva").val(reserva.id_paquete);
        $("#cboHabitacion").val(reserva.id_habitacion);
        $("#txtObservacionesReserva").val(reserva.observaciones);
    }
}

async function EjecutarComando() {
    if (!metodoActual) {
        console.error("No hay método definido");
        return;
    }

    if (metodoActual.funcion == 'Consultar') {
        return Consultar();
    }

    // Creamos la direccion URL
    let URL = BaseUrl + "api/Reserva/" + metodoActual.funcion;

    let esInsertar = (metodoActual.funcion === 'Insertar');

    // Creamos el servicio
    const reserva = new Reserva(
        esInsertar ? null : $("#txtIDReserva").val(), // Si es insertar, ID va null
        $("#txtFechaReserva").val(),
        $("#txtFechaEntrada").val(),
        $("#txtFechaSalida").val(),
        $("#txtNumeroHuespedes").val(),
        $("#txtObservacionesReserva").val(),
        $("#chkActivoReserva").prop('checked'),
        $("#cboDocumento").val(),
        $("#cboHabitacion").val(),
        $("#cboPaqueteReserva").val());


    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, reserva);
    $("#dvMensaje").show();
    LlenarTablaReservas();
}

class Reserva {
    constructor(id_reserva, fecha_reserva, fecha_llegada, fecha_salida, numero_huespedes,
        observaciones, activo, documento_cliente, id_habitacion, id_paquete) {

        this.id_reserva = id_reserva;
        this.fecha_reserva = fecha_reserva;
        this.fecha_llegada = fecha_llegada
        this.fecha_salida = fecha_salida;
        this.numero_huespedes = numero_huespedes;
        this.observaciones = observaciones;
        this.activo = activo;
        this.documento_cliente = documento_cliente;
        this.id_habitacion = id_habitacion;
        this.id_paquete = id_paquete;
    }
}

jQuery(function () {
    //Registrar los botones para responder al evento click

    $("#dvMenu").load("../Paginas/Menu.html") // Carga el menú de navegación.

    InicializarPagina();

    LlenarTablaReservas();

    LlenarComboPaquetes();

    LlenarComboHabitaciones();

    LlenarComboDocumentoCliente();

    console.log("jQuery cargado correctamente");

    $("#btnInsertar").click(function () {
        console.log("Botón clickeado");
        MostrarDatosEntrada();
        OcultarBotones();

        // Guardar el método y función en la variable global
        metodoActual = {
            metodo: 'POST',
            funcion: 'Insertar'
        };

        // Configurar para modo insertar
        ConfigurarModoInsertar();
    });

    $("#btnActualizar").click(function () {
        console.log("Botón Actualizar clickeado");
        MostrarDatosEntrada();
        OcultarBotones();

        // Guardar el método y función
        metodoActual = {
            metodo: 'PUT',
            funcion: 'Actualizar'
        };

        // Configurar para modo edición
        ConfigurarModoEdicion();
    });

    $("#btnEliminar").click(function () {
        console.log("Botón Eliminar clickeado");
        MostrarDatosEntrada();
        OcultarBotones();

        // Guardar el método y función
        metodoActual = {
            metodo: 'DELETE',
            funcion: 'Eliminar'
        };

        // Configurar para modo edición
        ConfigurarModoEliminar();
    });

    $("#btnConsultar").click(function () {
        console.log("Botón Consultar clickeado");
        MostrarDatosEntrada();
        MostrarBotones();

        // Guardar el método y función
        metodoActual = {
            metodo: 'GET',
            funcion: 'Consultar'
        };

        // Configurar para modo edición
        ConfigurarModoEliminar();
    });

    $("#btnConfirmar").click(function () {
        EjecutarComando();

        // Solo ocultar los datos si NO es una consulta
        if (metodoActual && metodoActual.funcion !== 'Consultar') {
            OcultarDatosEntrada();
        }
        // Si es consultar, mantener los datos visibles para mostrar el resultado
    });

    $("#btnCancelar").click(function () {
        metodoActual = null; // Limpiar el método al cancelar
        OcultarDatosEntrada();
    });

    $("#btnCheck-in").click(function () {
        console.log("Botón Check-in clickeado");
        MostrarDatosEntrada();
        MostrarBotones();

        // Guardar el método y función
        metodoActual = {
            metodo: 'GET',
            funcion: 'Consultar'
        };

        // Configurar para modo edición
        ConfigurarModoEliminar();
    });

    $("#btnConsultar").click(function () {
        console.log("Botón Consultar clickeado");
        MostrarDatosEntrada();
        MostrarBotones();

        // Guardar el método y función
        metodoActual = {
            metodo: 'GET',
            funcion: 'Consultar'
        };

        // Configurar para modo edición
        ConfigurarModoEliminar();
    });
});






