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
    [EnableCors(origins: "http://localhost:57735", headers: "*", methods: "*")]
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

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Habitacion habitacion)
        {
            clsHabitacion hab = new clsHabitacion();
            hab.habitacion = habitacion;
            return hab.Eliminar();
        }
    }
}