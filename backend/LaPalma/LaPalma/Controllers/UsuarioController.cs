using LaPalma.Clases;
using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LaPalma.Controllers
{
    [RoutePrefix("api/Usuario")]
    public class UsuarioController : ApiController
    {
        [HttpPost]
        [Route("CrearUsuario")]
        public string CrearUsuario([FromBody] Usuario usuario, int idPerfil)
        {
            clsUsuario user = new clsUsuario();
            user.usuario = usuario;
            return user.CrearUsuario(idPerfil);
        }
    }
}