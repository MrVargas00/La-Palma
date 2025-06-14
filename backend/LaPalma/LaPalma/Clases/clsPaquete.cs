﻿using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsPaquete: IDisposable
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Paquete paquete { get; set; }

        public clsPaquete()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }

        public List<Paquete> ListarPaquetes()
        {
            return bdLaPalma.Paquetes
                    .OrderBy(p => p.id_paquete)
                    .ToList();
        }

        public Paquete Consultar(int id)
        {
            Paquete paq = bdLaPalma.Paquetes.FirstOrDefault(e => e.id_paquete == id);
            return paq;
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.Paquetes.Add(paquete);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el paquete con id: " + paquete.nombre + " y id: " + paquete.id_paquete;
            }
            catch (Exception)
            {
                return "Error al agregar el paquete";
            }
        }

        public string Actualizar()
        {
            try
            {
                Paquete paq = Consultar(paquete.id_paquete);
                if (paq == null)
                {
                    return "El paquete no existe";
                }
                bdLaPalma.Paquetes.AddOrUpdate(paquete);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el paquete con id: " + paquete.id_paquete;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar el paquete con id: " + paquete.id_paquete;
            }
        }

        public string Eliminar()
        {
            try
            {
                Paquete paq = Consultar(paquete.id_paquete);
                if (paq == null)
                {
                    return "El paquete no existe";
                }
                bdLaPalma.Paquetes.Remove(paq);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente el paquete";
            }
            catch (Exception)
            {
                return "Error al eliminar el paquete";
            }
        }

        public IQueryable<Paquete> llenarcombo()
        {
            try
            {
                return bdLaPalma.Paquetes
                    .Where(p => p.activo)
                    .OrderBy(p => p.nombre);
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