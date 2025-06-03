using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsTipoVista : IDisposable
    {
        private DBLAPALMAEntities bdLaPalma;
        public Tipo_Vista tipo_vis { get; set; }
        public clsTipoVista()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }

        public IQueryable<Tipo_Vista> llenarcombo()
        {
            try
            {
                return bdLaPalma.Tipo_Vista;
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

    public class clsTipoHabitacion : IDisposable
    {
        private DBLAPALMAEntities bdLaPalma;
        public Tipo_Habitacion tipo_hab { get; set; }

        public clsTipoHabitacion()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }
        public IQueryable<Tipo_Habitacion> llenarcombo()
        {
            try
            {
                return bdLaPalma.Tipo_Habitacion;
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

    public class clsTipoDocumento
    {
        private DBLAPALMAEntities bdLaPalma;
        public Tipo_Documento tipo_doc { get; set; }

        public clsTipoDocumento()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }
        public IQueryable<Tipo_Documento> llenarcombo()
        {
            try
            {
                return bdLaPalma.Tipo_Documento;
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

    public class clsTipoProveedor
    {
        private DBLAPALMAEntities bdLaPalma;
        public Tipo_Proveedor tipo_prov { get; set; }

        public clsTipoProveedor()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }
        public IQueryable<Tipo_Proveedor> llenarcombo()
        {
            try
            {
                return bdLaPalma.Tipo_Proveedor;
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

    public class clsGenero
    {
        private DBLAPALMAEntities bdLaPalma;
        public Genero genero { get; set; }

        public clsGenero()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }
        public IQueryable<Genero> llenarcombo()
        {
            try
            {
                return bdLaPalma.Generoes;
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

    public class clsIdioma
    {
        private DBLAPALMAEntities bdLaPalma;
        public Idioma idioma { get; set; }

        public clsIdioma()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }
        public IQueryable<Idioma> llenarcombo()
        {
            try
            {
                return bdLaPalma.Idiomas;
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

    public class clsPais
    {
        private DBLAPALMAEntities bdLaPalma;
        public Pai pai { get; set; }

        public clsPais()
        {
            bdLaPalma = new DBLAPALMAEntities();
        }
        public IQueryable<Pai> llenarcombo()
        {
            try
            {
                return bdLaPalma.Pais;
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