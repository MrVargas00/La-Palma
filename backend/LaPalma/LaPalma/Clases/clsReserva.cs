using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsReserva
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Reserva reserva { get; set; }

        public List<Reserva> ListarReservas()
        {
            return bdLaPalma.Reservas
                    .OrderBy(p => p.id_reserva)
                    .ToList();
        }

        public Reserva Consultar(int id)
        {
            Reserva res = bdLaPalma.Reservas.FirstOrDefault(e => e.id_reserva == id);
            return res;
        }

        public string ConsultarEstado(int id)
        {
            Reserva res = bdLaPalma.Reservas.FirstOrDefault(e => e.id_reserva == id);
            if( res.Estado == 1)
            {
                return "La reserva no ha sido completada";
            }
            else
            {
                if(res.Estado == 2)
                {
                    return "SI";
                }
                else
                {
                    return "La reserva ya hizo check-in";
                }
            }
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.Reservas.Add(reserva);
                bdLaPalma.SaveChanges();
                return "Se reservó exitosamente la reserva con id: " + reserva.id_reserva + " y documento del cliente: " + reserva.documento_cliente;
            }
            catch (Exception)
            {
                return "Error al agregar la reserva";
            }
        }

        public string Actualizar()
        {
            try
            {
                Reserva res = Consultar(reserva.id_reserva);
                if (res == null)
                {
                    return "La Reserva no existe";
                }
                bdLaPalma.Reservas.AddOrUpdate(reserva);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente la reserva con id: " + reserva.id_reserva;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar la reserva con id: " + reserva.id_reserva;
            }
        }

        public string Eliminar()
        {
            try
            {
                Reserva res = Consultar(reserva.id_habitacion);
                if (res == null)
                {
                    return "La Reserva no existe";
                }
                bdLaPalma.Reservas.Remove(res);
                bdLaPalma.SaveChanges();
                return "Se canceló exitosamente la reserva";
            }
            catch (Exception)
            {
                return "Error al eliminar la reserva";
            }
        }
    }
}