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
    $("#frmCliente")[0].reset();
}

function OcultarDatosEntradaTel() {
    $("#datos_entrada_telefono").hide();
    $("#botones_telefono").show();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaCliente() {
    let URL = BaseUrl + "api/Cliente/ListarClientes"
    LlenarTablaXServiciosAuth(URL, '#tblClientes');
}

function LlenarTablaTelefonos() {
    let URL = BaseUrl + "api/Telefono/ListarTelefonos?tipo_duenio="+"Cliente"
    LlenarTablaXServiciosAuth(URL, '#tblTelefonos');
}

function LlenarComboTipoDocumento() {
    let URL = BaseUrl + "api/TipoDocumento/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoDocumento');
}

function LlenarComboGenero() {
    let URL = BaseUrl + "api/Genero/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboTipoGenero');
}

function LlenarComboPais() {
    let URL = BaseUrl + "api/Pais/LlenarCombo";
    LlenarComboXServiciosAuth(URL, '#cboPais');
}

function LlenarComboCiudad(idPais = null) {
    let URL = BaseUrl + "api/Ciudad/LlenarCombo";

    // Si se proporciona un ID de país, agregarlo como parámetro
    if (idPais) { URL += "?idPais=" + idPais;
    }
    LlenarComboXServiciosAuth(URL, '#cboCiudad');
}

function LlenarComboIdioma() {
    let URL = BaseUrl + "api/Idiomas/LlenarCombo"; // URL actualizada
    LlenarComboXServiciosAuth(URL, '#cboIdiomaPreferencia');
}

function LlenarComboTipoTelefono() {
    let URL = BaseUrl + "api/TipoTelefono/LlenarCombo";
    LlenarComboXServiciosAuth(URL, '#cboTipoTelefono');
}

function LlenarComboClienteTelefono() {
    let URL = BaseUrl + "api/Cliente/LlenarCombo";
    LlenarComboXServiciosAuth(URL, '#cboClienteTelefono');
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

    // Configurar combo país
    $("#cboPais").val('1');
    $("#cboPais").prop('disabled', false);

    // Limpiar y deshabilitar combo ciudad hasta que se seleccione un país
    $("#cboCiudad").empty();
    $("#cboCiudad").append('<option value="">Seleccione primero un país</option>');
    $("#cboCiudad").prop('disabled', true);

    $("#cboIdiomaPreferencia").val('1');
    $("#cboIdiomaPreferencia").prop('disabled', false);
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

    // Configurar combo país
    $("#cboPais").val('1');
    $("#cboPais").prop('disabled', false);

    // Limpiar combo ciudad
    $("#cboCiudad").empty();
    $("#cboCiudad").append('<option value="">Seleccione primero un país</option>');
    $("#cboCiudad").prop('disabled', true);

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
    $("#cboPais").val('1');
    $("#cboPais").prop('disabled', true);
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

// Funciones para configurar modos de teléfonos
function ConfigurarModoInsertarTelefono() {
    $("#txtIDtelefono").val(''); // Limpiar el ID
    $("#txtIDtelefono").prop('disabled', true); // Habilitar
    $("#txtNumero").val('');
    $("#txtNumero").prop('disabled', false);
    $("#cboTipoTelefono").val('1');
    $("#cboTipoTelefono").prop('disabled', false);
    $("#cboClienteTelefono").val('');
    $("#cboClienteTelefono").prop('disabled', false);
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
    $("#cboClienteTelefono").val('');
    $("#cboClienteTelefono").prop('disabled', false);
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
    $("#cboClienteTelefono").val('');
    $("#cboClienteTelefono").prop('disabled', true);
    $("#chkActivoTelefono").prop('checked', true);
    $("#chkActivoTelefono").prop('disabled', true);
}

function LimpiarFormularioTelefono() {
    $("#txtCodigo").val('');
    $("#cboTipoTelefono").val('0');
    $("#txtNumero").val('');
    $("#cboClienteTelefono").val('');
}

async function ObtenerYSeleccionarPaisPorCiudad(idCiudad) {
    try {
        // Llamar al servicio para obtener el país de la ciudad
        let URL = BaseUrl + "api/Ciudad/ObtenerPaisPorCiudad?idCiudad=" + idCiudad;
        const paisInfo = await ConsultarServicioAuth(URL);

        if (paisInfo && paisInfo.id_pais) {
            // Seleccionar el país
            $("#cboPais").val(paisInfo.id_pais);

            // Habilitar el combo de ciudad
            $("#cboCiudad").prop('disabled', false);

            // Llenar las ciudades de ese país usando tu función existente
            let URLCiudades = BaseUrl + "api/Ciudad/LlenarCombo?idPais=" + paisInfo.id_pais;
            await LlenarComboXServiciosAuth(URLCiudades, '#cboCiudad');

            // Finalmente seleccionar la ciudad específica
            $("#cboCiudad").val(idCiudad);
        }
    } catch (error) {
        console.error("Error al obtener país por ciudad:", error);
        // Si hay error, llenar todos los combos normalmente
        $("#cboPais").val('1');
        $("#cboCiudad").prop('disabled', false);
        LlenarComboCiudad();
        $("#cboCiudad").val(idCiudad);
    }
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
        // Llenar los datos básicos del cliente
        $("#txtDocumentoCliente").val(cliente.documento);
        $("#txtNombreCliente").val(cliente.nombre);
        $("#txtApellidosCliente").val(cliente.apellido);
        $("#txtFechaNacimiento").val(cliente.fecha_nacimiento);
        $("#txtDireccionCliente").val(cliente.direccion);
        $("#txtEmailCliente").val(cliente.email);
        $("#cboIdiomaPreferencia").val(cliente.idioma_preferido);
        $("#cboTipoGenero").val(cliente.id_genero);
        $("#cboTipoDocumento").val(cliente.tipo_documento);
        $("#chkActivoCliente").prop('checked', cliente.activo);

        // Primero obtener el país de la ciudad seleccionada
        await ObtenerYSeleccionarPaisPorCiudad(cliente.ciudad_origen);
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

    // Creamos el servicio
    const cliente = new Cliente(
        $("#txtDocumentoCliente").val(),
        $("#txtNombreCliente").val(),
        $("#txtApellidosCliente").val(),
        $("#txtFechaNacimiento").val(),
        $("#txtDireccionCliente").val(),
        $("#txtEmailCliente").val(),
        $("#chkActivoCliente").prop('checked'),
        $("#cboCiudad").val(),
        $("#cboIdiomaPreferencia").val(),
        $("#cboTipoGenero").val(),
        $("#cboTipoDocumento").val())

    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, cliente);
    $("#dvMensaje").show();
    LlenarTablaCliente();
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
        "Cliente", // tipo_duenio es fijo como "Cliente"
        $("#cboClienteTelefono").val(), // id_duenio es el cliente seleccionado
        $("#chkActivoTelefono").prop('checked')
    );

    const Rpta = await EjecutarComandoServicioAuth(metodoTelefonoActual.metodo, URL, telefono);

    $("#dvMensajeTel").show(); // Mostrar mensaje en el div correcto del modal
    LlenarTablaTelefonos();
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

    LlenarTablaCliente();

    LlenarComboPais();

    LlenarComboTipoDocumento();

    LlenarComboIdioma();

    LlenarComboGenero();

    console.log("jQuery cargado correctamente");

    // Evento para cuando cambia el país seleccionado
    $("#cboPais").change(function () {
        let paisSeleccionado = $(this).val();

        if (paisSeleccionado && paisSeleccionado !== '') {
            // Habilitar combo ciudad y llenarlo con las ciudades del país seleccionado
            $("#cboCiudad").prop('disabled', false);
            LlenarComboCiudad(paisSeleccionado);
        } else {
            // Deshabilitar combo ciudad si no hay país seleccionado
            $("#cboCiudad").empty();
            $("#cboCiudad").append('<option value="">Seleccione primero un país</option>');
            $("#cboCiudad").prop('disabled', true);
        }
    });

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
        LlenarComboClienteTelefono();
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