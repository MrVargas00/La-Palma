using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using LaPalma.Models;

namespace LaPalma.Clases
{
    public class clsTipoServicio: IDisposable
    {
        private DBLAPALMAEntities bdLaPalma;
        public TipoServicio tipo_serv { get; set; }

        public clsTipoServicio()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }

        public IQueryable<TipoServicio> llenarcombo()
        {
            try
            {
                return bdLaPalma.TipoServicios;
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