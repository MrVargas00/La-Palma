﻿using System;
using System.Collections.Generic;
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
    [RoutePrefix("api/Servicio")]
    public class ServicioController : ApiController
    {
        [HttpGet]
        [Route("ListarServicios")]
        public List<Servicio> ListarServicios()
        {
            clsServicios serv = new clsServicios();
            return serv.ListarServiciosxNombre();
        }

        [HttpGet]
        [Route("Consultar")]
        public Servicio Consultar(int ID)
        {
            clsServicios serv = new clsServicios();
            return serv.Consultar(ID);
        }

        [HttpGet]
        [Route("ConsultarXNombre")]
        public List<Servicio> ConsultarXServicio(string nombre)
        {
            clsServicios serv = new clsServicios();
            return serv.Consultar_ServiciosxNombre(nombre);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Servicio servicio)
        {
            clsServicios serv = new clsServicios();
            serv.servicio = servicio;
            return serv.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Servicio servicio)
        {
            clsServicios serv = new clsServicios();
            serv.servicio = servicio;
            return serv.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Servicio servicio)
        {
            clsServicios serv = new clsServicios();
            serv.servicio = servicio;
            return serv.Eliminar();
        }
    }
}