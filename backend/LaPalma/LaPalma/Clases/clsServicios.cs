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

        // CONSULTAR SERVICIO POR ID
        public Servicio Consultar(int id)
        {
           Servicio serv = bdLaPalma.Servicios.FirstOrDefault(e => e.id_servicio == id);
            return serv;
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
                Servicio serv = Consultar(servicio.id_servicio);
                if (serv == null)
                {
                    return "El servicio no existe";
                }
                bdLaPalma.Servicios.AddOrUpdate(servicio);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el servicio con id: " + servicio.id_servicio;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar el servicio con id: " + servicio.id_servicio;
            }
        }

        //  ELIMINAMOS SERVICIOS
        public string Eliminar()
        {
            try
            {
                Servicio serv = Consultar(servicio.id_servicio);
                if (serv == null)
                {
                    return "El Servicio no existe";
                }
                bdLaPalma.Servicios.Remove(serv);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente el servicio";
            }
            catch (Exception)
            {
                return "Error al eliminar el servicio";
            }
        }
    }
}