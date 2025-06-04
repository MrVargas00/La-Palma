using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsCliente
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Cliente cliente { get; set; }

        public List<Cliente> ListarCliente()
        {
            return bdLaPalma.Clientes
                    .OrderBy(p => p.documento)
                    .ToList();
        }

        public Cliente Consultar(string documento)
        {
            Cliente clien = bdLaPalma.Clientes.FirstOrDefault(e => e.documento == documento);
            return clien;
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.Clientes.Add(cliente);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el cliente: " + cliente.nombre + " y documento: " + cliente.documento;
            }
            catch (Exception)
            {
                return "Error al agregar el cliente";
            }
        }

        public string Actualizar()
        {
            try
            {
                Cliente clien = Consultar(cliente.documento);
                if (clien == null)
                {
                    return "El cliente no existe";
                }
                bdLaPalma.Clientes.AddOrUpdate(cliente);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el cliente con documento: " + cliente.documento;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar el cliente con documento: " + cliente.documento;
            }
        }

        public string Eliminar()
        {
            try
            {
                Cliente clien = Consultar(cliente.documento);
                if (clien == null)
                {
                    return "El cliente no existe";
                }
                bdLaPalma.Clientes.Remove(clien);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente el cliente";
            }
            catch (Exception)
            {
                return "Error al eliminar el cliente";
            }
        }

        public IQueryable<Cliente> llenarcombo()
        {
            try
            {
                return bdLaPalma.Clientes
                    .Where(p => p.activo)
                    .OrderBy(p => p.documento);
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