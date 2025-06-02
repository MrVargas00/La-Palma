using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Web;

using LaPalma.Models;

namespace LaPalma.Clases
{
    public class clsHotel
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Hotel hotel { get; set; }


        // CONSULTAR HOTELES
        public List<Hotel> ListarHoteles()
        {
            return bdLaPalma.Hotels
                    .OrderBy(p => p.nombre)
                    .ToList();
        }

        // CONSULTAR HOTEL POR ID
        public Hotel ConsultarxID(int id)
        {
            return bdLaPalma.Hotels.FirstOrDefault(p => p.id_hotel == id);
        }

        // CONSULTAMOS POR EL NOMBRE (POSIBLES REPETIDOS)
        public List<Hotel> Consultar_HotelesxNombre(string nombre)
        {
            return bdLaPalma.Hotels
                .Where(p => p.nombre == nombre)
                .OrderBy(p => p.nombre)
                .ToList();
        }

        // AGREGAMOS HOTELES
        public string Insertar()
        {
            try
            {
                bdLaPalma.Hotels.Add(hotel);
                bdLaPalma.SaveChanges();
                return "Se agrego exitosamente el hotel con nombre: " + hotel.nombre + " y id: " + hotel.id_hotel;
            }
            catch (Exception ex)
            {
                return "Error al agregar el hotel. El error es:" + ex.Message;
            }
        }


        // ACTUALIZAMOS HOTELES
        public string Actualizar()
        {
            try
            {
                Hotel mot = ConsultarxID(hotel.id_hotel);
                if (mot == null)
                {
                    return "El hotel no existe";
                }
                bdLaPalma.Hotels.AddOrUpdate(hotel);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el hotel con ID: " + hotel.id_hotel;
            }
            catch (Exception)
            {
                return "Error al actualizar el hotel";
            }
        }

        //  ELIMINAMOS HOTELES
        public string Eliminar(int id)
        {
            try
            {
                Hotel mot = ConsultarxID(id);
                if (mot == null)
                {
                    return "El Hotel no existe";
                }
                bdLaPalma.Hotels.Remove(mot);
                bdLaPalma.SaveChanges();
                return "Se eliminó exitosamente el hotel";
            }
            catch (Exception)
            {
                return "Error al eliminar el hotel";
            }
        }

        public IQueryable<Hotel> llenarcombo()
        {
            try
            {
                return bdLaPalma.Hotels;
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