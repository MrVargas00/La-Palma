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
    [RoutePrefix("api/Reserva")]
    public class ReservaController : ApiController
    {
        [HttpGet]
        [Route("ListarReservas")]
        public List<Reserva> ListarReservas()
        {
            clsReserva res = new clsReserva();
            return res.ListarReservas();
        }

        [HttpGet]
        [Route("Consultar")]
        public Reserva Consultar(int ID)
        {
            clsReserva res = new clsReserva();
            return res.Consultar(ID);
        }

        [HttpGet]
        [Route("ConsultarEstado")]
        public string ConsultarEstado(int ID)
        {
            clsReserva res = new clsReserva();
            return res.ConsultarEstado(ID);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Reserva reserva)
        {
            clsReserva res = new clsReserva();
            res.reserva = reserva;
            return res.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Reserva reserva)
        {
            clsReserva res = new clsReserva();
            res.reserva = reserva;
            return res.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Reserva reserva)
        {
            clsReserva res = new clsReserva();
            res.reserva = reserva;
            return res.Eliminar();
        }
    }
}