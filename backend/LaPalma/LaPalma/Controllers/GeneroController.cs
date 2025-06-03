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
    [RoutePrefix("api/Genero")]
    public class GeneroController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsGenero genero = null;
            try
            {
                genero = new clsGenero();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = genero.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_genero,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener los generos: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                genero?.Dispose();
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