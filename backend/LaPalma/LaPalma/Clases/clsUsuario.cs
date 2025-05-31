using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using System.Web;

using LaPalma.Models;

namespace LaPalma.Clases
{
    public class clsUsuario
    {
        private DBLAPALMAEntities bdLaPalma = new DBLAPALMAEntities();

        public Usuario usuario { get; set; }


        public Usuario BuscarUsuario(string username)
        {
            return bdLaPalma.Usuarios.FirstOrDefault(p => p.username == username);
        }

        public string CrearUsuario(int idPerfil) 
        {
            try
            {
                if (BuscarUsuario(usuario.username) == null)
                {
                    clsCypher cypher = new clsCypher();
                    cypher.Password = usuario.clave;
                    if (cypher.CifrarClave())
                    {
                        // Graba el usuario
                        usuario.clave = cypher.PasswordCifrado;
                        usuario.salt = cypher.Salt;
                        bdLaPalma.Usuarios.Add(usuario);
                        bdLaPalma.SaveChanges();

                        // Graba el perfil del usuario

                        Usuario_Perfil usuario_Perfil = new Usuario_Perfil();
                        usuario_Perfil.id_perfil = idPerfil;
                        usuario_Perfil.activo = true;
                        usuario_Perfil.id_usuario = usuario.id_usuario;
                        bdLaPalma.Usuario_Perfil.Add(usuario_Perfil);
                        bdLaPalma.SaveChanges();
                        return "Se creó el usuario exitosamente";
                    }
                    else
                    {
                        return "No se pudo cifrar la clave";
                    }
                }
                else
                {
                    return "El usuario ya existe";
                }
            }
            catch (Exception ex)
            {
                return "No se pudo agregar el usuario, algo falló. El error es: " + ex.Message;
            }
        }
    }
}