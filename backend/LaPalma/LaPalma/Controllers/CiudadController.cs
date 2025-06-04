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
    [EnableCors(origins: "http://localhost:57735", headers: "*", methods: "*")]
    [RoutePrefix("api/Ciudad")]
    public class CiudadController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsCiudad ciudad = null;
            try
            {
                ciudad = new clsCiudad();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = ciudad.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_ciudad,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener las ciudades: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                ciudad?.Dispose();
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