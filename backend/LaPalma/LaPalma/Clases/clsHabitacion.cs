using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsHabitacion
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Habitacion habitacion { get; set; }

        public List<Habitacion> ListarHabitacionxNumero()
        {
            return bdLaPalma.Habitacions
                    .OrderBy(p => p.numero_habitacion)
                    .ToList();
        }

        public Habitacion Consultar(int id)
        {
            Habitacion hab = bdLaPalma.Habitacions.FirstOrDefault(e => e.id_habitacion == id);
            return hab;
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.Habitacions.Add(habitacion);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente la habitacion con numero: " + habitacion.numero_habitacion + " y id: " + habitacion.id_habitacion;
            }
            catch (Exception)
            {
                return "Error al agregar la habitacion";
            }
        }

        public string Actualizar()
        {
            try
            {
                Habitacion hab = Consultar(habitacion.id_habitacion);
                if (hab == null)
                {
                    return "La Habitacion no existe";
                }
                bdLaPalma.Habitacions.AddOrUpdate(habitacion);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente la habitacion con id: " + habitacion.id_habitacion;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar la habitacion con id: " + habitacion.id_habitacion;
            }
        }

        public string Eliminar()
        {
            try
            {
                Habitacion hab = Consultar(habitacion.id_habitacion);
                if (hab == null)
                {
                    return "La Habitacion no existe";
                }
                bdLaPalma.Habitacions.Remove(hab);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente la habitación";
            }
            catch (Exception)
            {
                return "Error al eliminar la habitación";
            }
        }

        public IQueryable<Habitacion> llenarcombo()
        {
            try
            {
                return bdLaPalma.Habitacions
                    .Where(p => p.activo)
                    .OrderBy(p => p.numero_habitacion);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en llenarcombo: {ex.Message}");
                throw;
            }
        }

        // Implementar IDisposable para liberar recursos
        public void Dispose()
        {
            bdLaPalma?.Dispose();
        }
    }
}