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
    [RoutePrefix("api/Paquete")]
    public class PaqueteController : ApiController
    {
        [HttpGet]
        [Route("ListarPaquetes")]
        public List<Paquete> ListarPaquetes()
        {
            clsPaquete paq = new clsPaquete();
            return paq.ListarPaquetes();
        }

        [HttpGet]
        [Route("Consultar")]
        public Paquete Consultar(int ID)
        {
            clsPaquete paq = new clsPaquete();
            return paq.Consultar(ID);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Paquete paquete)
        {
            clsPaquete paq = new clsPaquete();
            paq.paquete = paquete;
            return paq.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Paquete paquete)
        {
            clsPaquete paq = new clsPaquete();
            paq.paquete = paquete;
            return paq.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Paquete paquete)
        {
            clsPaquete paq = new clsPaquete();
            paq.paquete = paquete;
            return paq.Eliminar();
        }
    }
}