using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsCiudad : IDisposable
    {
        private DBLAPALMAEntities bdLaPalma;
        public Ciudad ciudad { get; set; }
        public clsCiudad()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }

        public IQueryable<Ciudad> llenarcombo()
        {
            try
            {
                return bdLaPalma.Ciudads;
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