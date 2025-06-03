var BaseUrl = "http://localhost:63533/";

var metodoActual = null;

function MostrarDatosEntrada() {
    $("#datos_entrada").show();
    $("#id_botones").hide();
}

function OcultarDatosEntrada() {
    $("#datos_entrada").hide();
    $("#id_botones").show();
    // Limpiar los campos del formulario
    $("#frmHabitaciones")[0].reset();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaHabitaciones() {
    let URL = BaseUrl + "api/Habitacion/ListarHabitaciones"
    LlenarTablaXServiciosAuth(URL, '#tblHabitaciones');
}

function LlenarComboTipoHabitacion() {
    let URL = BaseUrl + "api/TipoHabitacion/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoHabitacion');
}

function LlenarComboHotel() {
    let URL = BaseUrl + "api/Hotel/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboHotelHabitacion');
}

function LlenarComboTipoVista() {
    let URL = BaseUrl + "api/TipoVista/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoVista');
}

function ConfigurarModoInsertar() { // Función para configurar el modo insertar
    $("#txtIDHabitacion").val(''); // Limpiar el ID
    $("#txtIDHabitacion").prop('disabled', true); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtHabitacion").val('');
    $("#txtHabitacion").prop('disabled', false);
    $("#txtPrecioHabitacion").val('');
    $("#txtPrecioHabitacion").prop('disabled', false);
    $("#cboTipoVista").val('1');
    $("#cboTipoVista").prop('disabled', false);
    $("#chkActivoHabitacion").prop('checked', false);
    $("#chkActivoHabitacion").prop('disabled', false);
    $("#cboHotelHabitacion").val('1');
    $("#cboHotelHabitacion").prop('disabled', false);
    $("#cboTipoHabitacion").val('1');
    $("#cboTipoHabitacion").prop('disabled', false)
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEdicion() {
    $("#txtIDHabitacion").val(''); // Limpiar el ID
    $("#txtIDHabitacion").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtHabitacion").val('');
    $("#txtHabitacion").prop('disabled', false);
    $("#txtPrecioHabitacion").val('');
    $("#txtPrecioHabitacion").prop('disabled', false);
    $("#cboTipoVista").val('1');
    $("#cboTipoVista").prop('disabled', false);
    $("#chkActivoHabitacion").prop('checked', false);
    $("#chkActivoHabitacion").prop('disabled', false);
    $("#cboHotelHabitacion").val('1');
    $("#cboHotelHabitacion").prop('disabled', false);
    $("#cboTipoHabitacion").val('1');
    $("#cboTipoHabitacion").prop('disabled', false)
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEliminar() {
    $("#txtIDHabitacion").val(''); // Limpiar el ID
    $("#txtIDHabitacion").prop('disabled', false); // Deshabilitar campo ID
    // Deshabilitar todos los demás campos
    $("#txtHabitacion").val('');
    $("#txtHabitacion").prop('disabled', true);
    $("#txtPrecioHabitacion").val('');
    $("#txtPrecioHabitacion").prop('disabled', true);
    $("#cboTipoVista").val('1');
    $("#cboTipoVista").prop('disabled', true);
    $("#chkActivoHabitacion").prop('checked', true);
    $("#chkActivoHabitacion").prop('disabled', true);
    $("#cboHotelHabitacion").val('1');
    $("#cboHotelHabitacion").prop('disabled', true);
    $("#cboTipoHabitacion").val('1');
    $("#cboTipoHabitacion").prop('disabled', true)
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

async function Consultar() {
    let ID = $("#txtIDHabitacion").val();
    let URL = BaseUrl + "api/Habitacion/Consultar?ID=" + ID;
    const habitacion = await ConsultarServicioAuth(URL);
    if (habitacion == null) {
        // No existe, se borran los datos
        OcultarDatosEntrada();
        $("#dvMensaje").html("La habitacion no existe");
        $("#dvMensaje").show();

    } else {
        $("#txtIDHabitacion").val(habitacion.id_habitacion);
        $("#txtHabitacion").val(habitacion.numero_habitacion);
        $("#txtPrecioHabitacion").val(habitacion.precio);
        $("#cboHotelHabitacion").val(habitacion.id_hotel);
        $("#chkActivoHabitacion").prop('checked', habitacion.activo);
        $("#cboTipoHabitacion").val(habitacion.id_tipo_habitacion);
        $("#cboTipoVista").val(habitacion.tipo_vista);
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
    let URL = BaseUrl + "api/Habitacion/" + metodoActual.funcion;

    let esInsertar = (metodoActual.funcion === 'Insertar');

    // Creamos el servicio
    const habitacion = new Habitacion(
        esInsertar ? null : $("#txtIDHabitacion").val(), // Si es insertar, ID va null
        $("#txtHabitacion").val(),
        $("#chkActivoHabitacion").prop('checked'),
        $("#txtPrecioHabitacion").val(),
        $("#cboTipoVista").val(),
        $("#cboHotelHabitacion").val(),
        $("#cboTipoHabitacion").val());

    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, habitacion);
    $("#dvMensaje").show();
    LlenarTablaHabitaciones();
}

class Habitacion {
    constructor(id_habitacion, numero_habitacion, activo, precio, tipo_vista, id_hotel, id_tipo_habitacion) {
        this.id_habitacion = id_habitacion;
        this.numero_habitacion = numero_habitacion;
        this.activo = activo
        this.precio = precio;
        this.tipo_vista = tipo_vista;
        this.id_hotel = id_hotel;
        this.id_tipo_habitacion = id_tipo_habitacion;
    }
}

jQuery(function () {
    //Registrar los botones para responder al evento click

    $("#dvMenu").load("../Paginas/Menu.html") // Carga el menú de navegación.

    InicializarPagina();

    LlenarTablaHabitaciones();

    LlenarComboTipoHabitacion();

    LlenarComboHotel();

    LlenarComboTipoVista();

    console.log("jQuery cargado correctamente");

    $("#btnInsertar").click(function () {
        console.log("Botón clickeado");
        MostrarDatosEntrada();

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
});






