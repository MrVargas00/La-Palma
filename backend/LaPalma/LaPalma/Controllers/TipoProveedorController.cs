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
    [RoutePrefix("api/TipoProveedor")]
    public class TipoProveedorController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsTipoProveedor tipo_prov = null;
            try
            {
                tipo_prov = new clsTipoProveedor();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = tipo_prov.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_tipo_proveedor,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener tipos de proveedor: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                tipo_prov?.Dispose();
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