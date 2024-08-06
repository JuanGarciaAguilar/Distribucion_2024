using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class UsuarioEntity
    {
        public string UserID { get; set; }
        public string Password { get; set; }
        public string rPassword { get; set; }        
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RoleDescription { get; set; }
        public string tipo { get; set; }
    }
}
