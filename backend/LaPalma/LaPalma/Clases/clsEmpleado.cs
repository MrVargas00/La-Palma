using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsEmpleado
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Empleado empleado { get; set; }

        public List<Empleado> ListarEmpleados()
        {
            return bdLaPalma.Empleadoes
                    .OrderBy(p => p.documento)
                    .ToList();
        }

        public Empleado Consultar(string documento)
        {
            Empleado empl = bdLaPalma.Empleadoes.FirstOrDefault(e => e.documento == documento);
            return empl;
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.Empleadoes.Add(empleado);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el empleado con nombre: " + empleado.nombre + " y documento: " + empleado.documento;
            }
            catch (Exception)
            {
                return "Error al agregar el empleado";
            }
        }

        public string Actualizar()
        {
            try
            {
                Empleado empl = Consultar(empleado.documento);
                if (empl == null)
                {
                    return "El empleado no existe";
                }
                bdLaPalma.Empleadoes.AddOrUpdate(empleado);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el empleado con documento: " + empleado.documento;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar el empleado con documento: " + empleado.documento;
            }
        }

        public string Eliminar()
        {
            try
            {
                Empleado empl = Consultar(empleado.documento);
                if (empl == null)
                {
                    return "El empleado no existe";
                }
                bdLaPalma.Empleadoes.Remove(empl);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente el empleado ";
            }
            catch (Exception)
            {
                return "Error al eliminar el empleado";
            }
        }
    }
}