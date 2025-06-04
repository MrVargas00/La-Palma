using LaPalma.Clases;
using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LaPalma.Controllers
{
    [EnableCors(origins: "http://localhost:57735", headers: "*", methods: "*")]
    [RoutePrefix("api/Cliente")]
    public class ClienteController : ApiController
    {
        [HttpGet]
        [Route("ListarClientes")]
        public List<Cliente> ListarClientes()
        {
            clsCliente clien = new clsCliente();
            return clien.ListarCliente();
        }

        [HttpGet]
        [Route("Consultar")]
        public Cliente Consultar(string documento)
        {
            clsCliente clien = new clsCliente();
            return clien.Consultar(documento);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Cliente cliente)
        {
            clsCliente clien = new clsCliente();
            clien.cliente = cliente;
            return clien.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Cliente cliente)
        {
            clsCliente clien = new clsCliente();
            clien.cliente = cliente;
            return clien.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Cliente cliente)
        {
            clsCliente clien = new clsCliente();
            clien.cliente = cliente;
            return clien.Eliminar();
        }
    }
}