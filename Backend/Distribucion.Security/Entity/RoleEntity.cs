using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Security.Entity
{
    public class RoleEntity
    {
        public int RoleID { get; set; }
        public string RoleDescription { get; set; }
        public byte RoleState { get; set; }
        public string CreationDate { get; set; }
        public string CreationUser { get; set; }
        public string UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    }
}
