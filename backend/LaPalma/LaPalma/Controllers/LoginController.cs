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
    [RoutePrefix("api/Login")]
    [AllowAnonymous]

    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("Ingresar")]
        public IQueryable<LoginRespuesta> Ingresar(Login login)
        {
            clsLogin log = new clsLogin();
            log.login = login;
            return log.Ingresar();
        }
    }
}