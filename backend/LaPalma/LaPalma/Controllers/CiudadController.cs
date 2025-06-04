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
    [RoutePrefix("api/Ciudad")]
    public class CiudadController : ApiController
    {
        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo(int? idPais = null)
        {
            clsCiudad ciudad = null;
            try
            {
                ciudad = new clsCiudad();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                // Pasar el parámetro idPais a la clase
                var datos = ciudad.llenarcombo(idPais).ToList();

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

        // Agregar este método al CiudadController existente

        [HttpGet]
        [Route("ObtenerPaisPorCiudad")]
        public IHttpActionResult ObtenerPaisPorCiudad(int idCiudad)
        {
            clsCiudad ciudad = null;
            try
            {
                ciudad = new clsCiudad();

                var ciudadInfo = ciudad.ObtenerPaisPorCiudad(idCiudad);

                if (ciudadInfo != null)
                {
                    var result = new
                    {
                        id_ciudad = ciudadInfo.id_ciudad,
                        nombre_ciudad = ciudadInfo.nombre,
                        id_pais = ciudadInfo.id_pais
                        // Removemos nombre_pais ya que no lo necesitas en el frontend
                    };

                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ObtenerPaisPorCiudad: {ex.Message}");
                return InternalServerError(new Exception($"Error al obtener el país de la ciudad: {ex.Message}"));
            }
            finally
            {
                ciudad?.Dispose();
            }
        }

        [HttpOptions]
        [Route("ObtenerPaisPorCiudad")]
        public IHttpActionResult OptionsObtenerPaisPorCiudad()
        {
            return Ok();
        }
    }
}