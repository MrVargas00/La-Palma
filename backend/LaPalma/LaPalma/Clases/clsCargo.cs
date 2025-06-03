using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsCargo : IDisposable
    {
        private DBLAPALMAEntities bdLaPalma;
        public Cargo cargo { get; set; }
        public clsCargo()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }

        public IQueryable<Cargo> llenarcombo()
        {
            try
            {
                return bdLaPalma.Cargoes;
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