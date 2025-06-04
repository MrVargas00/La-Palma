using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace LaPalma.Clases
{
    public class clsCheckIn
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public CheckIn check { get; set; }

        public List<CheckIn> ListarChecksIn()
        {
            return bdLaPalma.CheckIns
                    .OrderBy(p => p.id_checkin)
                    .ToList();
        }

        public CheckIn Consultar(int id)
        {
            CheckIn check = bdLaPalma.CheckIns.FirstOrDefault(e => e.id_checkin == id);
            return check;
        }

        public string Insertar()
        {
            try
            {
                bdLaPalma.CheckIns.Add(check);
                bdLaPalma.SaveChanges();
                return "Se agrego hixo check-in exitosamente con id: " + check.id_checkin;
            }
            catch (Exception)
            {
                return "Error al hacer check-in";
            }
        }

        public string Actualizar()
        {
            try
            {
                CheckIn che = Consultar(check.id_checkin);
                if (che == null)
                {
                    return "La Check-In no existe";
                }
                bdLaPalma.CheckIns.AddOrUpdate(check);
                bdLaPalma.SaveChanges();
                return "Se actualizó exitosamente el check-in con id:: " + check.id_checkin;
            }
            catch (Exception)
            {
                return "Algo falló al actualizar el check-in con id:: " + check.id_checkin;
            }
        }

        
    }
}