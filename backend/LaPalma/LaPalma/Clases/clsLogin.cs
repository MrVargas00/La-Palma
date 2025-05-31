using Servicios_Jue.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using LaPalma.Models;

namespace LaPalma.Clases
{
    public class clsLogin
    {
        public clsLogin()
        {
            loginRespuesta = new LoginRespuesta();
        }
        public DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();
        public Login login { get; set; }
        public LoginRespuesta loginRespuesta { get; set; }
        public bool ValidarUsuario()
        {
            try
            {
                clsCypher cifrar = new clsCypher();
                Usuario usuario = bdLaPalma.Usuarios.
                    FirstOrDefault(u => u.username == login.Usuario);
                if (usuario == null)
                {
                    loginRespuesta.Autenticado = false;
                    loginRespuesta.Mensaje = "Usuario no existe";
                    return false;
                }
                byte[] arrBytesSalt = Convert.FromBase64String(usuario.salt);
                string ClaveCifrada = cifrar.HashPassword(login.Clave, arrBytesSalt);
                login.Clave = ClaveCifrada;
                return true;
            }
            catch (Exception ex)
            {
                loginRespuesta.Autenticado = false;
                loginRespuesta.Mensaje = ex.Message;
                return false;
            }
        }

        private bool ValidarClave()
        {
            try
            {
                Usuario usuario = bdLaPalma.Usuarios.FirstOrDefault(u => u.username == login.Usuario && u.clave == login.Clave);
                if (usuario == null)
                {
                    loginRespuesta.Autenticado = false;
                    loginRespuesta.Mensaje = "La clave no coincide";
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                loginRespuesta.Autenticado = false;
                loginRespuesta.Mensaje = ex.Message;
                return false;
            }
        }

        public IQueryable<LoginRespuesta> Ingresar()
        {
            if (ValidarUsuario() && ValidarClave())
            {
                string token = TokenGenerator.GenerateTokenJwt(login.Usuario);
                return from U in bdLaPalma.Set<Usuario>()
                       join UP in bdLaPalma.Set<Usuario_Perfil>()
                       on U.id_usuario equals UP.id_usuario
                       join P in bdLaPalma.Set<Perfil>()
                       on UP.id_perfil equals P.id_perfil
                       where U.username == login.Usuario &&
                               U.clave == login.Clave
                       select new LoginRespuesta
                       {
                           Usuario = U.username,
                           Autenticado = true,
                           Perfil = P.nombre,
                           PaginaInicio = P.paginanavegar,
                           Token = token,
                           Mensaje = ""
                       };
            }
            else
            {
                List<LoginRespuesta> List = new List<LoginRespuesta>();
                List.Add(loginRespuesta);
                return List.AsQueryable();
            }
        }
    }
}