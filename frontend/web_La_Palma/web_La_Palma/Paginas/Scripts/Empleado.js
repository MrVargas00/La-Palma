var BaseUrl = "http://lapalma.runasp.net/";

var metodoActual = null;
var metodoTelefonoActual = null;

function MostrarDatosEntrada() {
    $("#datos_entrada").show();
    $("#id_botones").hide();
}

function MostrarDatosEntradaTel() {
    $("#datos_entrada_telefono").show();
    $("#botones_telefono").hide();
}

function MostrarBotonesTel() {
    $("#botones_telefono").show()
}

function OcultarDatosEntrada() {
    $("#datos_entrada").hide();
    $("#id_botones").show();
    // Limpiar los campos del formulario
    $("#frmEmpleados")[0].reset();
}

function OcultarDatosEntradaTel() {
    $("#datos_entrada_telefono").hide();
    $("#botones_telefono").show();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaEmpleados() {
    let URL = BaseUrl + "api/Empleado/ListarEmpleados"
    LlenarTablaXServiciosAuth(URL, '#tblEmpleados');
}

function LlenarTablaTelefonos() {
    let URL = BaseUrl + "api/Telefono/ListarTelefonos?tipo_duenio=" + "Empleado"
    LlenarTablaXServiciosAuth(URL, '#tblTelefonos');
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

function LlenarComboTipoTelefono() {
    let URL = BaseUrl + "api/TipoTelefono/LlenarCombo";
    LlenarComboXServiciosAuth(URL, '#cboTipoTelefono');
}

function LlenarComboEmpleadoTelefono() {
    let URL = BaseUrl + "api/Empleado/LlenarCombo";
    LlenarComboXServiciosAuth(URL, '#cboEmpleadoTelefono');
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

function ConfigurarModoInsertarTelefono() {
    $("#txtIDtelefono").val(''); // Limpiar el ID
    $("#txtIDtelefono").prop('disabled', true); // Habilitar
    $("#txtNumero").val('');
    $("#txtNumero").prop('disabled', false);
    $("#cboTipoTelefono").val('1');
    $("#cboTipoTelefono").prop('disabled', false);
    $("#cboEmpleadoTelefono").val('');
    $("#cboEmpleadoTelefono").prop('disabled', false);
    $("#chkActivoTelefono").prop('checked', false);
    $("#chkActivoTelefono").prop('disabled', false);
}

function ConfigurarModoActualizarTelefono() {
    $("#txtIDtelefono").val(''); // Limpiar el ID
    $("#txtIDtelefono").prop('disabled', false); // Habilitar
    $("#txtNumero").val('');
    $("#txtNumero").prop('disabled', false);
    $("#cboTipoTelefono").val('1');
    $("#cboTipoTelefono").prop('disabled', false);
    $("#cboEmpleadoTelefono").val('');
    $("#cboEmpleadoTelefono").prop('disabled', false);
    $("#chkActivoTelefono").prop('checked', false);
    $("#chkActivoTelefono").prop('disabled', false);
}

function ConfigurarModoEliminarTelefono() {
    $("#txtIDtelefono").val(''); // Limpiar el ID
    $("#txtIDtelefono").prop('disabled', false); // Habilitar
    $("#txtNumero").val('');
    $("#txtNumero").prop('disabled', true);
    $("#cboTipoTelefono").val('1');
    $("#cboTipoTelefono").prop('disabled', true);
    $("#cboEmpleadoTelefono").val('');
    $("#cboEmpleadoTelefono").prop('disabled', true);
    $("#chkActivoTelefono").prop('checked', true);
    $("#chkActivoTelefono").prop('disabled', true);
}

function LimpiarFormularioTelefono() {
    $("#txtCodigo").val('');
    $("#cboTipoTelefono").val('0');
    $("#txtNumero").val('');
    $("#cboEmpleadoTelefono").val('');
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

async function EjecutarComandoTelefono() {
    if (!metodoTelefonoActual) {
        console.error("No hay método definido");
        return;
    }

    // Creamos la direccion URL
    let URL = BaseUrl + "api/Telefono/" + metodoTelefonoActual.funcion;

    let esInsertar = (metodoTelefonoActual.funcion === 'Insertar');

    // Creamos el servicio
    const telefono = new Telefono(
        esInsertar ? null : $("#txtIDtelefono").val(), // Si es insertar, ID va null
        $("#txtNumero").val(),
        $("#cboTipoTelefono").val(),
        "Empleado", // tipo_duenio es fijo como "Cliente"
        $("#cboEmpleadoTelefono").val(), // id_duenio es el cliente seleccionado
        $("#chkActivoTelefono").prop('checked')
    );

    const Rpta = await EjecutarComandoServicioAuth(metodoTelefonoActual.metodo, URL, telefono);

    $("#dvMensajeTel").show(); // Mostrar mensaje en el div correcto del modal
    LlenarTablaTelefonos();
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

class Telefono {
    constructor(id_telefono, numero, id_tipo_telefono, tipo_duenio, id_duenio, activo) {
        this.id_telefono = id_telefono;
        this.numero = numero;
        this.id_tipo_telefono = id_tipo_telefono;
        this.tipo_duenio = tipo_duenio;
        this.id_duenio = id_duenio;
        this.activo = activo;
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

    $("#btnTelefonos").click(function () {
        console.log("Botón Teléfonos clickeado");
        LlenarTablaTelefonos();
        LlenarComboTipoTelefono();
        LlenarComboEmpleadoTelefono();
        LimpiarFormularioTelefono();
        OcultarDatosEntradaTel();
        MostrarBotonesTel();
    });

    $("#btnInsertarTel").click(function () {
        console.log("Botón Insertar Teléfono clickeado");
        metodoTelefonoActual = { // Usar metodoTelefonoActual en lugar de metodoActual
            metodo: 'POST',
            funcion: 'Insertar'
        };
        MostrarDatosEntradaTel();
        ConfigurarModoInsertarTelefono();
    });

    $("#btnActualizarTel").click(function () {
        console.log("Botón Actualizar Teléfono clickeado");
        metodoTelefonoActual = { // Usar metodoTelefonoActual
            metodo: 'PUT',
            funcion: 'Actualizar'
        };
        MostrarDatosEntradaTel();
        ConfigurarModoActualizarTelefono();
    });

    $("#btnEliminarTel").click(function () {
        console.log("Botón Eliminar Teléfono clickeado");
        metodoTelefonoActual = { // Usar metodoTelefonoActual
            metodo: 'DELETE',
            funcion: 'Eliminar'
        };
        MostrarDatosEntradaTel();
        ConfigurarModoEliminarTelefono();
    });

    // CORREGIR: eliminar la lógica duplicada
    $("#btnConfirmarTel").click(function () {
        EjecutarComandoTelefono();
    });

    $("#btnCancelarTel").click(function () {
        metodoTelefonoActual = null; // Usar metodoTelefonoActual
        LimpiarFormularioTelefono();
        OcultarDatosEntradaTel();
    });
});






