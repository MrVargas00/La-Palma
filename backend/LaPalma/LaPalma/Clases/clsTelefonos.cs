using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsTelefonos
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Telefono telefono { get; set; }

        public List<Telefono> ListarTelefonos(string tipo_duenio)
        {
            return bdLaPalma.Telefonoes
                    .Where(t => t.tipo_duenio == tipo_duenio)
                    .OrderBy(t => t.tipo_duenio)
                    .ThenBy(t => t.numero)
                    .ToList();
        }

        public Telefono Consultar(int id)
        {
            Telefono tele = bdLaPalma.Telefonoes.FirstOrDefault(e => e.id_telefono == id);
            return tele;
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.Telefonoes.Add(telefono);
                bdLaPalma.SaveChanges();
                return "Se agregó exitosamente el telefono con numero: " + telefono.numero + " y id: " + telefono.id_telefono;
            }
            catch (Exception)
            {
                return "Error al agregar el telefono";
            }
        }

        public string Actualizar()
        {
            try
            {
                Telefono tele = Consultar(telefono.id_telefono);
                if (tele == null)
                {
                    return "El telefono no existe";
                }
                bdLaPalma.Telefonoes.AddOrUpdate(telefono);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el telefono con id: " + telefono.id_telefono;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar el telefono con id: " + telefono.id_telefono;
            }
        }

        public string Eliminar()
        {
            try
            {
                Telefono tele = Consultar(telefono.id_telefono);
                if (tele == null)
                {
                    return "El telefono no existe";
                }
                bdLaPalma.Telefonoes.Remove(tele);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente el telefono";
            }
            catch (Exception)
            {
                return "Error al eliminar el telefono";
            }
        }

        public IQueryable<Telefono> llenarcombo()
        {
            try
            {
                return bdLaPalma.Telefonoes
                    .Where(p => p.activo)
                    .OrderBy(p => p.id_telefono);
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