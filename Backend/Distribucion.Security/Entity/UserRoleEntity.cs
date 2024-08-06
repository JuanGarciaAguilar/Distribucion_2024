using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Security.Entity
{
    public class UserRoleEntity
    {
        public int UserRoleID { get; set; }
        public string UserID { get; set; }
        public int RoleID { get; set; }
        public byte UserRoleState { get; set; }
        public string CreationDate { get; set; }
        public string CreationUser { get; set; }
        public string UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    }
}
