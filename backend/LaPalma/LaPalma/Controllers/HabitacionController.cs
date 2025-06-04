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
    [RoutePrefix("api/Habitacion")]
    public class HabitacionController : ApiController
    {
        [HttpGet]
        [Route("ListarHabitaciones")]
        public List<Habitacion> ListarHabitaciones()
        {
            clsHabitacion hab = new clsHabitacion();
            return hab.ListarHabitacionxNumero();
        }

        [HttpGet]
        [Route("Consultar")]
        public Habitacion Consultar(int ID)
        {
            clsHabitacion hab = new clsHabitacion();
            return hab.Consultar(ID);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Habitacion habitacion)
        {
            clsHabitacion hab = new clsHabitacion();
            hab.habitacion = habitacion;
            return hab.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Habitacion habitacion)
        {
            clsHabitacion hab = new clsHabitacion();
            hab.habitacion = habitacion;
            return hab.Actualizar();
        }

        [HttpPut]
        [Route("CambiarEstado")]
        public string CambiarEstado([FromBody] Habitacion habitacion)
        {
            clsHabitacion hab = new clsHabitacion();
            hab.habitacion = habitacion;
            return hab.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Habitacion habitacion)
        {
            clsHabitacion hab = new clsHabitacion();
            hab.habitacion = habitacion;
            return hab.Eliminar();
        }

        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsHabitacion hab = null;
            try
            {
                hab = new clsHabitacion();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = hab.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.id_habitacion,
                    Nombre = t.numero_habitacion
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener las habitaciones: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                hab?.Dispose();
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