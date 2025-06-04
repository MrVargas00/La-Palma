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
    $("#frmEmpleados")[0].reset();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaEmpleados() {
    let URL = BaseUrl + "api/Empleado/ListarEmpleados"
    LlenarTablaXServiciosAuth(URL, '#tblEmpleados');
}

function LlenarComboTipoDocumento() {
    let URL = BaseUrl + "api/TipoDocumento/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoDocumentoEmpleado');
}

function LlenarComboGenero() {
    let URL = BaseUrl + "api/Genero/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboGeneroEmpleado');
}

function LlenarComboHotel() {
    let URL = BaseUrl + "api/Hotel/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboHotelEmpleado');
}

function LlenarComboCargo() {
    let URL = BaseUrl + "api/Cargo/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboCargoEmpleado');
}

function ConfigurarModoInsertar() { // Función para configurar el modo insertar
    $("#txtDocumentoEmpleado").val(''); // Limpiar el ID
    $("#txtDocumentoEmpleado").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtNombreEmpleado").val('');
    $("#txtNombreEmpleado").prop('disabled', false);
    $("#txtApellidosEmpleado").val('');
    $("#txtApellidosEmpleado").prop('disabled', false);
    $("#txtFechaNacimiento").val('');
    $("#txtFechaNacimiento").prop('disabled', false);
    $("#txtDireccionEmpleado").val('');
    $("#txtDireccionEmpleado").prop('disabled', false);
    $("#txtEmailEmpleado").val('');
    $("#txtEmailEmpleado").prop('disabled', false);
    $("#txtFechaContratacion").val('');
    $("#txtFechaContratacion").prop('disabled', false);
    $("#cboTipoDocumentoEmpleado").val('1');
    $("#cboTipoDocumentoEmpleado").prop('disabled', false);
    $("#cboCargoEmpleado").val('1');
    $("#cboCargoEmpleado").prop('disabled', false);
    $("#cboGeneroEmpleado").val('1');
    $("#cboGeneroEmpleado").prop('disabled', false);
    $("#cboHotelEmpleado").val('1');
    $("#cboHotelEmpleado").prop('disabled', false);
    $("#chkActivoEmpleado").prop('checked', false);
    $("#chkActivoEmpleado").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEdicion() {
    $("#txtDocumentoEmpleado").val(''); // Limpiar el ID
    $("#txtDocumentoEmpleado").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtNombreEmpleado").val('');
    $("#txtNombreEmpleado").prop('disabled', false);
    $("#txtApellidosEmpleado").val('');
    $("#txtApellidosEmpleado").prop('disabled', false);
    $("#txtFechaNacimiento").val('');
    $("#txtFechaNacimiento").prop('disabled', false);
    $("#txtDireccionEmpleado").val('');
    $("#txtDireccionEmpleado").prop('disabled', false);
    $("#txtEmailEmpleado").val('');
    $("#txtEmailEmpleado").prop('disabled', false);
    $("#txtFechaContratacion").val('');
    $("#txtFechaContratacion").prop('disabled', false);
    $("#cboCargoEmpleado").val('1');
    $("#cboCargoEmpleado").prop('disabled', false);
    $("#cboGeneroEmpleado").val('1');
    $("#cboGeneroEmpleado").prop('disabled', false);
    $("#cboHotelEmpleado").val('1');
    $("#cboHotelEmpleado").prop('disabled', false);
    $("#chkActivoEmpleado").prop('checked', false);
    $("#chkActivoEmpleado").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEliminar() {
    $("#txtDocumentoEmpleado").val(''); // Limpiar el ID
    $("#txtDocumentoEmpleado").prop('disabled', false); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtNombreEmpleado").val('');
    $("#txtNombreEmpleado").prop('disabled', true);
    $("#txtApellidosEmpleado").val('');
    $("#txtApellidosEmpleado").prop('disabled', true);
    $("#txtFechaNacimiento").val('');
    $("#txtFechaNacimiento").prop('disabled', true);
    $("#txtDireccionEmpleado").val('');
    $("#txtDireccionEmpleado").prop('disabled', true);
    $("#txtEmailEmpleado").val('');
    $("#txtEmailEmpleado").prop('disabled', true);
    $("#txtFechaContratacion").val('');
    $("#txtFechaContratacion").prop('disabled', true);
    $("#cboTipoDocumentoEmpleado").val('1');
    $("#cboTipoDocumentoEmpleado").prop('disabled', true);
    $("#cboCargoEmpleado").val('1');
    $("#cboCargoEmpleado").prop('disabled', true);
    $("#cboGeneroEmpleado").val('1');
    $("#cboGeneroEmpleado").prop('disabled', true);
    $("#cboHotelEmpleado").val('1');
    $("#cboHotelEmpleado").prop('disabled', true);
    $("#chkActivoEmpleado").prop('checked', true);
    $("#chkActivoEmpleado").prop('disabled', true);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

async function Consultar() {
    let Documento = $("#txtDocumentoEmpleado").val();
    let URL = BaseUrl + "api/Empleado/Consultar?Documento=" + Documento;
    const empleado = await ConsultarServicioAuth(URL);
    if (empleado == null) {
        // No existe, se borran los datos
        OcultarDatosEntrada();
        $("#dvMensaje").html("El empleado no existe");
        $("#dvMensaje").show();

    } else {
        $("#txtDocumentoEmpleado").val(empleado.documento);
        $("#txtNombreEmpleado").val(empleado.nombre);
        $("#txtApellidosEmpleado").val(empleado.apellidos);
        $("#txtFechaNacimiento").val(empleado.fecha_nacimiento ? empleado.fecha_nacimiento.split('T')[0] : '');
        $("#chkActivoEmpleado").prop('checked', empleado.activo); // activo
        $("#txtDireccionEmpleado").val(empleado.direccion);
        $("#txtEmailEmpleado").val(empleado.email);
        $("#txtFechaContratacion").val(empleado.fecha_contratacion ? empleado.fecha_contratacion.split('T')[0] : '');
        $("#cboCargoEmpleado").val(empleado.id_cargo);
        $("#cboGeneroEmpleado").val(empleado.id_genero);
        $("#cboHotelEmpleado").val(empleado.id_hotel);
        $("#cboTipoDocumentoEmpleado").val(empleado.tipo_documento);
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
    let URL = BaseUrl + "api/Empleado/" + metodoActual.funcion;

    // Obtener las fechas y asegurar que estén en formato YYYY-MM-DD
    let fechaNacimiento = $("#txtFechaNacimiento").val();
    let fechaContratacion = $("#txtFechaContratacion").val();

    if (fechaNacimiento) {fechaNacimiento = fechaNacimiento.split('T')[0];}
    if (fechaContratacion) {fechaContratacion = fechaContratacion.split('T')[0];}

    // Creamos el empleado
    const empleado = new Empleado(
        $("#txtDocumentoEmpleado").val(),
        $("#txtNombreEmpleado").val(),
        $("#txtApellidosEmpleado").val(),
        $("#txtEmailEmpleado").val(),
        $("#txtDireccionEmpleado").val(),
        fechaNacimiento,
        fechaContratacion,
        $("#chkActivoEmpleado").prop('checked'),
        $("#cboCargoEmpleado").val(),
        $("#cboGeneroEmpleado").val(),
        $("#cboTipoDocumentoEmpleado").val(),
        $("#cboHotelEmpleado").val()
    );

    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, empleado);
    $("#dvMensaje").show();
    LlenarTablaEmpleados();
}

class Empleado {
    constructor(documento, nombre, apellidos, email, direccion, fecha_nacimiento,
        fecha_contratacion, activo, id_cargo, id_genero, tipo_documento, id_hotel) {

        this.documento = documento;
        this.nombre = nombre;
        this.apellidos = apellidos
        this.email = email;
        this.direccion = direccion;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_contratacion = fecha_contratacion;
        this.activo = activo
        this.id_cargo = id_cargo;
        this.id_genero = id_genero;
        this.tipo_documento = tipo_documento;
        this.id_hotel = id_hotel;
    }
}

jQuery(function () {
    //Registrar los botones para responder al evento click

    $("#dvMenu").load("../Paginas/Menu.html") // Carga el menú de navegación.

    InicializarPagina();

    LlenarTablaEmpleados();

    LlenarComboTipoDocumento();

    LlenarComboGenero();

    LlenarComboHotel();

    LlenarComboCargo();

    console.log("jQuery cargado correctamente");

    $("#btnInsertar").click(function () {
        console.log("Botón Insertar clickeado");
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






