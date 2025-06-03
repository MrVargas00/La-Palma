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
    [RoutePrefix("api/Cargo")]
    public class CargoController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsCargo cargo = null;
            try
            {
                cargo = new clsCargo();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = cargo.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_cargo,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener cargos: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                cargo?.Dispose();
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