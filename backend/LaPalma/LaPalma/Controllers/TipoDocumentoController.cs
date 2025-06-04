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
    [RoutePrefix("api/TipoDocumento")]
    public class TipoDocumentoController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsTipoDocumento tipo_doc = null;
            try
            {
                tipo_doc = new clsTipoDocumento();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = tipo_doc.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_tipo_documento,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener tipos de documento: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                tipo_doc?.Dispose();
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