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
    [RoutePrefix("api/CheckIn")]
    public class CheckInController : ApiController
    {
        [HttpGet]
        [Route("ListarCheckIn")]
        public List<CheckIn> ListarCheckIn()
        {
            clsCheckIn checkin = new clsCheckIn();
            return checkin.ListarChecksIn();
        }

        [HttpGet]
        [Route("Consultar")]
        public CheckIn Consultar(int ID)
        {
            clsCheckIn checkin = new clsCheckIn();
            return checkin.Consultar(ID);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] CheckIn checkIn)
        {
            clsCheckIn checkin = new clsCheckIn();
            checkin.check = checkIn;
            return checkin.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] CheckIn checkIn)
        {
            clsCheckIn checkin = new clsCheckIn();
            checkin.check = checkIn;
            return checkin.Actualizar();
        }
    }
}