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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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

        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsPaquete paq = null;
            try
            {
                paq = new clsPaquete();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = paq.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_paquete,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener los paquetes: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                paq?.Dispose();
            }
        }

        [HttpOptions]
        [Route("LlenarCombo")]
        public IHttpActionResult Options()
        {
            return Ok();
        }
    }
}