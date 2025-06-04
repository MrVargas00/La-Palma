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
    $("#frmCliente")[0].reset();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaCliente() {
    let URL = BaseUrl + "api/Cliente/ListarClientes"
    LlenarTablaXServiciosAuth(URL, '#tblClientes');
}

function LlenarComboTipoDocumento() {
    let URL = BaseUrl + "api/TipoDocumento/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoDocumento');
}

function LlenarComboGenero() {
    let URL = BaseUrl + "api/Genero/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoGenero');
}

function LlenarComboCiudad() {
    let URL = BaseUrl + "api/Ciudad/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboCiudad');
}

function LlenarComboIdioma() {
    let URL = BaseUrl + "api/Idioma/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboIdiomaPreferencia');
}

function ConfigurarModoInsertar() { // Función para configurar el modo insertar
    $("#txtDocumentoCliente").val(''); // Limpiar el ID
    $("#txtDocumentoCliente").prop('disabled', false); // Habilitar
    // Limpiar otros campos
    $("#txtNombreCliente").val('');
    $("#txtNombreCliente").prop('disabled', false);
    $("#txtApellidosCliente").val('');
    $("#txtApellidosCliente").prop('disabled', false);
    $("#txtFechaNacimiento").val('');
    $("#txtFechaNacimiento").prop('disabled', false);
    $("#txtDireccionCliente").val('');
    $("#txtDireccionCliente").prop('disabled', false);
    $("#txtEmailCliente").val('');
    $("#txtEmailCliente").prop('disabled', false);
    $("#cboCiudad").val('1');
    $("#cboCiudad").prop('disabled', false);
    $("#cboIdiomaPreferencia").val('1');
    $("#cboIdiomaPreferencia").prop('disabled', true);
    $("#cboTipoGenero").val('1');
    $("#cboTipoGenero").prop('disabled', false);
    $("#cboTipoDocumento").val('1');
    $("#cboTipoDocumento").prop('disabled', false);
    $("#chkActivoCliente").prop('checked', false);
    $("#chkActivoCliente").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEdicion() {
    $("#txtDocumentoCliente").val(''); // Limpiar el ID
    $("#txtDocumentoCliente").prop('disabled', false); // Habilitar
    // Limpiar otros campos
    $("#txtNombreCliente").val('');
    $("#txtNombreCliente").prop('disabled', false);
    $("#txtApellidosCliente").val('');
    $("#txtApellidosCliente").prop('disabled', false);
    $("#txtFechaNacimiento").val('');
    $("#txtFechaNacimiento").prop('disabled', false);
    $("#txtDireccionCliente").val('');
    $("#txtDireccionCliente").prop('disabled', false);
    $("#txtEmailCliente").val('');
    $("#txtEmailCliente").prop('disabled', false);
    $("#cboCiudad").val('1');
    $("#cboCiudad").prop('disabled', false);
    $("#cboIdiomaPreferencia").val('1');
    $("#cboIdiomaPreferencia").prop('disabled', true);
    $("#cboTipoGenero").val('1');
    $("#cboTipoGenero").prop('disabled', false);
    $("#cboTipoDocumento").val('1');
    $("#cboTipoDocumento").prop('disabled', false);
    $("#chkActivoCliente").prop('checked', false);
    $("#chkActivoCliente").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEliminar() {
    $("#txtDocumentoCliente").val(''); // Limpiar el ID
    $("#txtDocumentoCliente").prop('disabled', false); // Habilitar
    // Limpiar otros campos
    $("#txtNombreCliente").val('');
    $("#txtNombreCliente").prop('disabled', true);
    $("#txtApellidosCliente").val('');
    $("#txtApellidosCliente").prop('disabled', true);
    $("#txtFechaNacimiento").val('');
    $("#txtFechaNacimiento").prop('disabled', true);
    $("#txtDireccionCliente").val('');
    $("#txtDireccionCliente").prop('disabled', true);
    $("#txtEmailCliente").val('');
    $("#txtEmailCliente").prop('disabled', true);
    $("#cboCiudad").val('1');
    $("#cboCiudad").prop('disabled', true);
    $("#cboIdiomaPreferencia").val('1');
    $("#cboIdiomaPreferencia").prop('disabled', true);
    $("#cboTipoGenero").val('1');
    $("#cboTipoGenero").prop('disabled', true);
    $("#cboTipoDocumento").val('1');
    $("#cboTipoDocumento").prop('disabled', true);
    $("#chkActivoCliente").prop('checked', true);
    $("#chkActivoCliente").prop('disabled', true);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}


async function Consultar() {
    let documento = $("#txtDocumentoCliente").val();
    let URL = BaseUrl + "api/Cliente/Consultar?documento=" + documento;
    const cliente = await ConsultarServicioAuth(URL);
    if (cliente == null) {
        // No existe, se borran los datos
        OcultarDatosEntrada();
        $("#dvMensaje").html("El cliente no existe");
        $("#dvMensaje").show();

    } else {
        $("#txtDocumentoCliente").val(cliente.documento);
        $("#txtNombreCliente").val(cliente.nombre);
        $("#txtApellidosCliente").val(cliente.apellido);
        $("#txtFechaNacimiento").val(cliente.fecha_nacimiento);
        $("#txtDireccionCliente").val(cliente.direccion);
        $("#txtEmailCliente").val(cliente.email);
        $("#cboCiudad").val(cliente.ciudad_origen);
        $("#cboIdiomaPreferencia").val(cliente.idioma_preferido);
        $("#cboTipoGenero").val(cliente.id_genero);
        $("#cboTipoDocumento").val(cliente.tipo_documento);
        $("#chkActivoCliente").prop('checked', cliente.activo);
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
    let URL = BaseUrl + "api/Cliente/" + metodoActual.funcion;

    let esInsertar = (metodoActual.funcion === 'Insertar');

    // Creamos el servicio
    const cliente = new Cliente(
        esInsertar ? null : $("#txtDocumentoCliente").val(), // Si es insertar, ID va null
        $("#txtNombreCliente").val(),
        $("#txtApellidosCliente").val(),
        $("#txtFechaNacimiento").val(),
        $("#txtDireccionCliente").val(),
        $("#txtEmailCliente").val(),
        $("#chkActivoCliente").prop('checked'),
        $("#cboCiudad").val(),
        $("#cboIdiomaPreferencia").val(),
        $("#cboTipoGenero").val(),
        $("#cboTipoDocumento").val());
      


    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, cliente);
    $("#dvMensaje").show();
    LlenarTablaCliente();
}

class Cliente {
    constructor(documento, nombre, apellido, fecha_nacimiento, direccion, email, activo,
        ciudad_origen, idioma_preferido, id_genero, tipo_documento) {
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.direccion = direccion;
        this.email = email;
        this.activo = activo;
        this.ciudad_origen = ciudad_origen;
        this.idioma_preferido = idioma_preferido;
        this.id_genero = id_genero;
        this.tipo_documento = tipo_documento;
    }
}

jQuery(function () {
    //Registrar los botones para responder al evento click

    $("#dvMenu").load("../Paginas/Menu.html") // Carga el menú de navegación.

    InicializarPagina();

    LlenarTablaCliente();

    LlenarComboCiudad();

    LlenarComboTipoDocumento();

    LlenarComboIdioma();

    LlenarComboGenero();

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