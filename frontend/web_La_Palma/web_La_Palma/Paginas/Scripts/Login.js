// var: Variables globales
// let: Variables locales
// const: Constantes locales

async function Ingresar() {
    console.log("Entró a Ingresar()");
    let BaseUrl = "http://localhost:63533/";
    let URL = BaseUrl + "api/Login/Ingresar";
    const login = new Login($("#txtUsuario").val(), $("#txtClave").val(), "");

    const respuesta = await EjecutarComandoServicioRpta("POST", URL, login);

    if (respuesta == undefined) {
        // Se debe borrar la cookie con la informacón
        document.cookie = "token = 0; path=/";
        // No obtuvo respuesta adecuada por parte del servidor
        // Se presenta el mensaje de error
        //Hubo un error al procesar el comando
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se pudo conectar con el servicio");
    }
    else
    {
        if (respuesta[0].Autenticado == false) {
            // No se autenticó en el servicio
            document.cookie = "token = 0; path=/";
            $("#dvMensaje").removeClass("alert alert-success");
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html("No se pudo realizar el proceso de autenticación" + respuesta[0].Mensaje);
        }
        else
        {
            // Se conectó correctamente con el servidor
            const extdays = 0.15;
            const d = new Date();
            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
            let expires = ";expires=" + d.toUTCString();
            document.cookie = "token=" + respuesta[0].Token + expires + ";path=/";
            $("#dvMensaje").removeClass("alert alert-danger");
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html(respuesta[0].Mensaje);
            document.cookie = "Perfil=" + respuesta[0].Perfil;
            document.cookie = "Usuario=" + respuesta[0].Usuario;
            window.location.href = respuesta[0].PaginaInicio;
        }
    }
}

class Login {
    constructor(Usuario, Clave, PaginaSolicitud) {
        this.Usuario = Usuario;
        this.Clave = Clave;
        this.PaginaSolicitud = PaginaSolicitud;
    }
}

$(document).ready(function () {
    console.log("jQuery cargado correctamente");

    $("#btnIngresar").click(function () {
        console.log("Botón clickeado");
        Ingresar();
    });
});