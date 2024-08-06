using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Security.Common
{
    public class Role
    {
        public const string distribucion_Role_GetAll = "distribucion_Role_GetAll"; //It is to obtain a list of all roles of the Database
        public const string distribucion_Role_GetActive = "distribucion_Role_GetActive"; //It is to obtain a list of all roles with status 1 = Active
        public const string distribucion_Role_Insert = "distribucion_Role_Insert";
        public const string distribucion_Role_Update = "distribucion_Role_Update";
        public const string distribucion_Role_Delete = "distribucion_Role_Delete";
        public const string distribucion_Role_ChangeActiveState = "distribucio_Role_ChangeActiveState";
    }
}
