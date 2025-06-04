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
    [RoutePrefix("api/EstadoHabitacion")]
    public class EstadoHabitacionController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsEstadoHabitacion estado_hab = null;
            try
            {
                estado_hab = new clsEstadoHabitacion();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = estado_hab.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_estadoH,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener los estados: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                estado_hab?.Dispose();
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