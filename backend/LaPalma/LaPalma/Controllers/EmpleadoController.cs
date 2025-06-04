using LaPalma.Clases;
using LaPalma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LaPalma.Controllers
{
    [EnableCors(origins: "http://localhost:57735", headers: "*", methods: "*")]
    [RoutePrefix("api/Empleado")]
    public class EmpleadoController : ApiController
    {
        [HttpGet]
        [Route("ListarEmpleados")]
        public List<Empleado> ListarEmpleados()
        {
            clsEmpleado empl = new clsEmpleado();
            return empl.ListarEmpleados();
        }

        [HttpGet]
        [Route("Consultar")]
        public Empleado Consultar(string Documento)
        {
            clsEmpleado empl = new clsEmpleado();
            return empl.Consultar(Documento);
        }

        [HttpPost]
        [Route("Insertar")]
        public string Insertar([FromBody] Empleado empleado)
        {
            clsEmpleado empl = new clsEmpleado();
            empl.empleado = empleado;
            return empl.Insertar();
        }

        [HttpPut]
        [Route("Actualizar")]
        public string Actualizar([FromBody] Empleado empleado)
        {
            clsEmpleado empl = new clsEmpleado();
            empl.empleado = empleado;
            return empl.Actualizar();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public string Eliminar([FromBody] Empleado empleado)
        {
            clsEmpleado empl = new clsEmpleado();
            empl.empleado = empleado;
            return empl.Eliminar();
        }

        [HttpGet]
        [Route("LlenarCombo")]
        public IHttpActionResult LlenarCombo()
        {
            clsEmpleado emp = null;
            try
            {
                emp = new clsEmpleado();

                // MATERIALIZAR LA CONSULTA INMEDIATAMENTE
                var datos = emp.llenarcombo().ToList();

                var result = datos.Select(t => new
                {
                    Codigo = t.documento,
                    Nombre = t.nombre
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error en LlenarCombo: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");

                return InternalServerError(new Exception($"Error al obtener los empleados: {ex.Message}"));
            }
            finally
            {
                // Liberar recursos
                emp?.Dispose();
            }
        }

        [HttpOptions]
        [Route("LlenarCombo")]
        public IHttpActionResult Options()
        {
            return Ok();
        }
    }
}