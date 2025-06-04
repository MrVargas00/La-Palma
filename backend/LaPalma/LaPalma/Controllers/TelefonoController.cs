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
    [RoutePrefix("api/Telefono")]
    public class TelefonoController : ApiController
    {
        [HttpGet]
        [Route("ListarTelefonos")]
        public List<Telefono> ListarTelefonos(string tipo_duenio)
        {
            clsTelefonos tele = new clsTelefonos();
            return tele.ListarTelefonos(tipo_duenio);
        }

        [HttpGet]
        [Route("Consultar")]
        public Telefono Consultar(int ID)
        {
            clsTelefonos tele = new clsTelefonos();
            return tele.Consultar(ID);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Telefono telefono)
        {
            clsTelefonos tele = new clsTelefonos();
            tele.telefono = telefono;
            return tele.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Telefono telefono)
        {
            clsTelefonos tele = new clsTelefonos();
            tele.telefono = telefono;
            return tele.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Telefono telefono)
        {
            clsTelefonos tele = new clsTelefonos();
            tele.telefono = telefono;
            return tele.Eliminar();
        }

        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsTelefonos tele = null;
            try
            {
                tele = new clsTelefonos();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = tele.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_telefono,
                    Nombre = t.numero
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener los telefonos: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                tele?.Dispose();
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