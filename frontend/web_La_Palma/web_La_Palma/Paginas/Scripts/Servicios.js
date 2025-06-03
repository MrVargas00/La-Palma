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
    $("#frmServicios")[0].reset();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaServicios() {
    let URL = BaseUrl + "api/Servicio/ListarServicios"
    LlenarTablaXServiciosAuth(URL, '#tblServicios');
}

function LlenarComboTiposServicio() {
    let URL = BaseUrl + "api/TipoServicios/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoServicio');
}

function LlenarComboHotel() {
    let URL = BaseUrl + "api/Hotel/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboHotel');
}

function ConfigurarModoInsertar() { // Función para configurar el modo insertar
    $("#txtID").val(''); // Limpiar el ID
    $("#txtID").prop('disabled', true); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtNombre").val('');
    $("#txtNombre").prop('disabled', false);
    $("#txtDescripcion").val('');
    $("#txtDescripcion").prop('disabled', false);
    $("#txtPrecio").val('');
    $("#txtPrecio").prop('disabled', false);
    $("#chkActivo").prop('checked', false);
    $("#chkActivo").prop('disabled', false);
    $("#cboHotel").val('1');
    $("#cboHotel").prop('disabled', false);
    $("#cboTipoServicio").val('1');
    $("#cboTipoServicio").prop('disabled', false)
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEdicion() {
    $("#txtID").val(''); // Limpiar el ID
    $("#txtID").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtNombre").val('');
    $("#txtNombre").prop('disabled', false);
    $("#txtDescripcion").val('');
    $("#txtDescripcion").prop('disabled', false);
    $("#txtPrecio").val('');
    $("#txtPrecio").prop('disabled', false);
    $("#chkActivo").prop('checked', false);
    $("#chkActivo").prop('disabled', false);
    $("#cboHotel").val('1');
    $("#cboHotel").prop('disabled', false);
    $("#cboTipoServicio").val('1');
    $("#cboTipoServicio").prop('disabled', false)
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEliminar() {
    $("#txtID").prop('disabled', false);

    // Deshabilitar todos los demás campos
    $("#txtNombre").prop('disabled', true);
    $("#txtDescripcion").prop('disabled', true);
    $("#txtPrecio").prop('disabled', true);
    $("#chkActivo").prop('disabled', true);
    $("#cboHotel").prop('disabled', true);
    $("#cboTipoServicio").prop('disabled', true);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

async function Consultar() {
    let ID = $("#txtID").val();
    let URL = BaseUrl + "api/Servicio/Consultar?ID=" + ID;
    const servicio = await ConsultarServicioAuth(URL);
    if (servicio == null) {
        // No existe, se borran los datos
        OcultarDatosEntrada();
        $("#dvMensaje").html("El servicio no existe");
        $("#dvMensaje").show();

    } else {
        $("#txtID").val(servicio.id_servicio);
        $("#txtNombre").val(servicio.nombre);
        $("#txtDescripcion").val(servicio.descripcion);
        $("#txtPrecio").val(servicio.precio);
        $("#chkActivo").prop('checked', servicio.activo); 
        $("#cboHotel").val(servicio.id_hotel);
        $("#cboTipoServicio").val(servicio.id_tipoServicio);
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
    let URL = BaseUrl + "api/Servicio/" + metodoActual.funcion;

    let esInsertar = (metodoActual.funcion === 'Insertar');

    // Creamos el servicio
    const servicio = new Servicio(
        esInsertar ? null : $("#txtID").val(), // Si es insertar, ID va null
        $("#txtNombre").val(),
        $("#txtDescripcion").val(),
        $("#txtPrecio").val(),
        $("#chkActivo").prop('checked'), // Usar prop('checked') para checkbox
        $("#cboHotel").val(),
        $("#cboTipoServicio").val());

    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, servicio);
    $("#dvMensaje").show();
    LlenarTablaServicios();
}

class Servicio {
    constructor(id_servicio, nombre, descripcion, precio, activo, id_hotel, id_tipoServicio) {
        this.id_servicio = id_servicio;
        this.nombre = nombre;
        this.descripcion = descripcion
        this.precio = precio;
        this.activo = activo;
        this.id_hotel = id_hotel;
        this.id_tipoServicio = id_tipoServicio;
    }
} 

jQuery(function () {
    //Registrar los botones para responder al evento click

    $("#dvMenu").load("../Paginas/Menu.html") // Carga el menú de navegación.

    InicializarPagina();

    LlenarTablaServicios(); 

    LlenarComboTiposServicio();

    LlenarComboHotel();

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






