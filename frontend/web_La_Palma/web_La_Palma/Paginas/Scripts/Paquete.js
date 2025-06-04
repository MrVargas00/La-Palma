var BaseUrl = "http://lapalma.runasp.net/";

var metodoActual = null;

function MostrarDatosEntrada() {
    $("#datos_entrada").show();
    $("#id_botones").hide();
}

function OcultarDatosEntrada() {
    $("#datos_entrada").hide();
    $("#id_botones").show();
    // Limpiar los campos del formulario
    $("#frmPaquetes")[0].reset();
}

function InicializarPagina() {
    $("#datos_entrada").hide(); // Ocultar datos de entrada al inicio
    $("#id_botones").show();    // Mostrar botones de proceso
}

function LlenarTablaPaquetes() {
    let URL = BaseUrl + "api/Paquete/ListarPaquetes"
    LlenarTablaXServiciosAuth(URL, '#tblPaquetes');
}

function ConfigurarModoInsertar() { // Función para configurar el modo insertar
    $("#txtID").val(''); // Limpiar el ID
    $("#txtID").prop('disabled', true); // Deshabilitar campo ID
    // Limpiar otros campos
    $("#txtNombrePaquete").val('');
    $("#txtNombrePaquete").prop('disabled', false);
    $("#txtPrecioPaquete").val('');
    $("#txtPrecioPaquete").prop('disabled', false);
    $("#txtDias").val('');
    $("#txtDias").prop('disabled', false);
    $("#txtDescripcionPaquete").val('');
    $("#txtDescripcionPaquete").prop('disabled', false);
    $("#chkAereo").prop('checked', false);
    $("#chkAereo").prop('disabled', false);
    $("#chkTerrestre").prop('checked', false);
    $("#chkTerrestre").prop('disabled', false);
    $("#chkSpa").prop('checked', false);
    $("#chkSpa").prop('disabled', false);
    $("#chkComida").prop('checked', false);
    $("#chkComida").prop('disabled', false);
    $("#chkTour").prop('checked', false);
    $("#chkTour").prop('disabled', false);
    $("#chkActivoPaquete").prop('checked', false);
    $("#chkActivoPaquete").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEdicion() {
    $("#txtID").val(''); // Limpiar el ID
    $("#txtID").prop('disabled', false); // Habilitar campo ID
    // Limpiar otros campos
    $("#txtNombrePaquete").val('');
    $("#txtNombrePaquete").prop('disabled', false);
    $("#txtPrecioPaquete").val('');
    $("#txtPrecioPaquete").prop('disabled', false);
    $("#txtDias").val('');
    $("#txtDias").prop('disabled', false);
    $("#txtDescripcionPaquete").val('');
    $("#txtDescripcionPaquete").prop('disabled', false);
    $("#chkAereo").prop('checked', false);
    $("#chkAereo").prop('disabled', false);
    $("#chkTerrestre").prop('checked', false);
    $("#chkTerrestre").prop('disabled', false);
    $("#chkSpa").prop('checked', false);
    $("#chkSpa").prop('disabled', false);
    $("#chkComida").prop('checked', false);
    $("#chkComida").prop('disabled', false);
    $("#chkTour").prop('checked', false);
    $("#chkTour").prop('disabled', false);
    $("#chkActivoPaquete").prop('checked', false);
    $("#chkActivoPaquete").prop('disabled', false);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

function ConfigurarModoEliminar() {
    $("#txtID").val(''); // Limpiar el ID
    $("#txtID").prop('disabled', false); // Habilitar campo ID
    // Limpiar otros campos
    $("#txtNombrePaquete").val('');
    $("#txtNombrePaquete").prop('disabled', true);
    $("#txtPrecioPaquete").val('');
    $("#txtPrecioPaquete").prop('disabled', true);
    $("#txtDias").val('');
    $("#txtDias").prop('disabled', true);
    $("#txtDescripcionPaquete").val('');
    $("#txtDescripcionPaquete").prop('disabled', true);
    $("#chkAereo").prop('checked', true);
    $("#chkAereo").prop('disabled', true);
    $("#chkTerrestre").prop('checked', true);
    $("#chkTerrestre").prop('disabled', true);
    $("#chkSpa").prop('checked', true);
    $("#chkSpa").prop('disabled', true);
    $("#chkComida").prop('checked', true);
    $("#chkComida").prop('disabled', true);
    $("#chkTour").prop('checked', true);
    $("#chkTour").prop('disabled', true);
    $("#chkActivoPaquete").prop('checked', true);
    $("#chkActivoPaquete").prop('disabled', true);
    $("#dvMensaje").html("");
    $("#dvMensaje").hide();
}

async function Consultar() {
    let ID = $("#txtID").val();
    let URL = BaseUrl + "api/Paquete/Consultar?ID=" + ID;
    const paquete = await ConsultarServicioAuth(URL);
    if (paquete == null) {
        // No existe, se borran los datos
        OcultarDatosEntrada();
        $("#dvMensaje").html("El paquete no existe");
        $("#dvMensaje").show();

    } else {
        $("#txtID").val(paquete.id_paquete);
        $("#txtNombrePaquete").val(paquete.nombre);
        $("#txtDescripcionPaquete").val(paquete.descripcion);
        $("#txtPrecioPaquete").val(paquete.precio);
        $("#txtDias").val(paquete.duracion_dias);
        $("#chkAereo").prop('checked', paquete.incluye_transporte_aereo);
        $("#chkTerrestre").prop('checked', paquete.incluye_transporte_terrestre);
        $("#chkSpa").prop('checked', paquete.incluye_spa);
        $("#chkComida").prop('checked', paquete.incluye_comidas);
        $("#chkTour").prop('checked', paquete.incluye_tour);
        $("#chkActivoPaquete").prop('checked', paquete.activo);
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
    let URL = BaseUrl + "api/Paquete/" + metodoActual.funcion;

    let esInsertar = (metodoActual.funcion === 'Insertar');

    // Creamos el servicio
    const paquete = new Paquete(
        esInsertar ? null : $("#txtID").val(), // Si es insertar, ID va null
        $("#txtNombrePaquete").val(),
        $("#txtDescripcionPaquete").val(),
        $("#txtPrecioPaquete").val(),
        $("#txtDias").val(),
        $("#chkAereo").prop('checked'),
        $("#chkTerrestre").prop('checked'),
        $("#chkSpa").prop('checked'),
        $("#chkComida").prop('checked'),
        $("#chkTour").prop('checked'),
        $("#chkActivoPaquete").prop('checked'));

    const Rpta = await EjecutarComandoServicioAuth(metodoActual.metodo, URL, paquete);
    $("#dvMensaje").show();
    LlenarTablaPaquetes();
}

class Paquete {
    constructor(id_paquete, nombre, descripcion, precio, duracion_dias, incluye_transporte_aereo, incluye_transporte_terrestre,
        incluye_spa, incluye_comidas, incluye_tour, activo) {
        this.id_paquete = id_paquete;
        this.nombre = nombre;
        this.descripcion = descripcion
        this.precio = precio;
        this.duracion_dias = duracion_dias;
        this.incluye_transporte_aereo = incluye_transporte_aereo;
        this.incluye_transporte_terrestre = incluye_transporte_terrestre;
        this.incluye_spa = incluye_spa;
        this.incluye_comidas = incluye_comidas;
        this.incluye_tour = incluye_tour;
        this.activo = activo;
    }
}

jQuery(function () {
    //Registrar los botones para responder al evento click

    $("#dvMenu").load("../Paginas/Menu.html") // Carga el menú de navegación.

    InicializarPagina();

    LlenarTablaPaquetes();


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

        LlenarTablaPaquetes();
        // Si es consultar, mantener los datos visibles para mostrar el resultado
    });

    $("#btnCancelar").click(function () {
        metodoActual = null; // Limpiar el método al cancelar
        OcultarDatosEntrada();
    });
});
