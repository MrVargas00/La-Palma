using LaPalma.Clases;
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
    [RoutePrefix("api/EstadoReserva")]
    public class EstadoReservaController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsEstadoReserva estado_res = null;
            try
            {
                estado_res = new clsEstadoReserva();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = estado_res.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_estadoR,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener estados: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                estado_res?.Dispose();
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