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
    [RoutePrefix("api/TipoHabitacion")]
    public class TipoHabitacionController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsTipoHabitacion tipo_hab = null;
            try
            {
                tipo_hab = new clsTipoHabitacion();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = tipo_hab.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_tipo_habitacion,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener tipos de habitacion: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                tipo_hab?.Dispose();
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