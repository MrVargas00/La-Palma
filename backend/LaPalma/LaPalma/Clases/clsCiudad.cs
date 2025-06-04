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

        public IQueryable<Ciudad> llenarcombo(int? idPais = null)
        {
            try
            {
                var query = bdLaPalma.Ciudads.AsQueryable();

                // Si se proporciona un idPais, filtrar por ese país
                if (idPais.HasValue && idPais.Value > 0)
                {
                    query = query.Where(c => c.id_pais == idPais.Value);
                }

                // Ordenar por nombre para mejor presentación
                return query.OrderBy(c => c.nombre);
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


        public Ciudad ObtenerPaisPorCiudad(int idCiudad)
        {
            try
            {
                return bdLaPalma.Ciudads
                    .FirstOrDefault(c => c.id_ciudad == idCiudad);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en ObtenerPaisPorCiudad: {ex.Message}");
                throw;
            }
        }
    }
}