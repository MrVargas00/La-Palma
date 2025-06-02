using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using LaPalma.Clases;
using LaPalma.Models;

namespace LaPalma.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Hotel")]
    public class HotelController : ApiController
    {
        [HttpGet]
        [Route("ListarHoteles")]
        public List<Hotel> ListarHoteles()
        {
            clsHotel mot = new clsHotel();
            return mot.ListarHoteles();
        }

        [HttpGet]
        [Route("ConsultarHotel")]
        public Hotel ConsultarHotel(int ID)
        {
            clsHotel mot = new clsHotel();
            return mot.ConsultarxID(ID);
        }

        [HttpGet]
        [Route("ConsultarXNombre")]
        public List<Hotel> ConsultarXNombre(string nombre)
        {
            clsHotel mot = new clsHotel();
            return mot.Consultar_HotelesxNombre(nombre);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Hotel hotel)
        {
            clsHotel mot = new clsHotel();
            mot.hotel = hotel;
            return mot.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Hotel hotel)
        {
            clsHotel mot = new clsHotel();
            mot.hotel = hotel;
            return mot.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar(int ID)
        {
            clsHotel mot = new clsHotel();
            return mot.Eliminar(ID);
        }

        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsHotel mot = null;
            try
            {
                mot = new clsHotel();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = mot.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_hotel,
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
                mot?.Dispose();
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