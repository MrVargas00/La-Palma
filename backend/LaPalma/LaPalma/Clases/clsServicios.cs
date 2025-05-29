using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

using LaPalma.Models;

namespace LaPalma.Clases
{
    public class clsServicios
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Servicio servicio { get; set; }


        // CONSULTAR SERVICIOS ORDENADOS POR PRECIO
        public List<Servicio> ListarServiciosxNombre()
        {
            return bdLaPalma.Servicios
                    .OrderBy(p => p.nombre)
                    .ToList();
        }

        // CONSULTAR SERVICIOS ORDENADOS POR PRECIO
        public List<Servicio> ListarServiciosxPrecio()
        {
            return bdLaPalma.Servicios
                    .OrderBy(p => p.precio)
                    .ToList();
        }

        // CONSULTAR SERVICIO POR ID
        public Servicio ConsultarxID(int id)
        {
            return bdLaPalma.Servicios.FirstOrDefault(p => p.id_servicio == id);
        }

        // CONSULTAMOS POR EL NOMBRE (POSIBLES REPETIDOS)
        public List<Servicio> Consultar_ServiciosxNombre(string nombre)
        {
            return bdLaPalma.Servicios
                .Where(p => p.nombre == nombre)
                .OrderBy(p => p.nombre)
                .ToList();
        }

        // AGREGAMOS SERVICIOS
        public string Insertar()
        {
            try
            {
                bdLaPalma.Servicios.Add(servicio);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el servicio con nombre: " + servicio.nombre + " y id: " + servicio.id_servicio;
            }
            catch (Exception ex)
            {
                return "Error al agregar el servicio. El error es:" + ex.Message;
            }
        }

        // ACTUALIZAMOS SERVICIOS
        public string Actualizar()
        {
            try
            {
                Servicio serv = ConsultarxID(servicio.id_servicio);
                if (serv == null)
                {
                    return "El servicio no existe";
                }
                bdLaPalma.Servicios.AddOrUpdate(servicio);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el servicio con nombre: " + servicio.id_servicio;
            }
            catch (Exception)
            {
                return "Se agrego exitosamente el servicio con nombre: " + servicio.id_servicio;
            }
        }

        //  ELIMINAMOS SERVICIOS
        public string Eliminar(int id)
        {
            try
            {
                Servicio serv = ConsultarxID(id);
                if (serv == null)
                {
                    return "El Servicio no existe";
                }
                bdLaPalma.Servicios.Remove(serv);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el servicio con nombre: " + servicio.id_servicio;
            }
            catch (Exception)
            {
                return "Error al eliminar el evento";
            }
        }
    }
}