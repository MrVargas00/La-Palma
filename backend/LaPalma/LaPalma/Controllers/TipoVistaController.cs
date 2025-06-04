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
    [RoutePrefix("api/TipoVista")]
    public class TipoVistaController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsTipoVista tipo_vis = null;
            try
            {
                tipo_vis = new clsTipoVista();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = tipo_vis.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_tipo_vista,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener tipos de vista: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                tipo_vis?.Dispose();
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