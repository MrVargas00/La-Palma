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
    [RoutePrefix("api/TipoServicios")]
    public class TipoServiciosController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsTipoServicio tipo_serv = null;
            try
            {
                tipo_serv = new clsTipoServicio();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = tipo_serv.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_tipoServicio,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener tipos de servicio: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                tipo_serv?.Dispose();
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