using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Security.Common
{
    public class UserRole
    {
        public const string distribucion_UserRole_GetAll = "distribucion_UserRole_GetAll"; //It is to obtain a list of all roles of the Database
        public const string distribucion_UserRole_GetActive = "distribucion_UserRole_GetActive"; //It is to obtain a list of all roles with status 1 = Active
        //public const string distribucion_UserRole_GetByRole = "distribucion_UserRole_GetByRole"; //It is to obtain a list of all Users with determinate Role
        public const string distribucion_UserRole_Insert = "distribucion_UserRole_Insert";
        public const string distribucion_UserRole_Update = "distribucion_UserRole_Update";
        public const string distribucion_UserRole_Delete = "distribucion_userRole_Delete";
        public const string distribucion_UserRole_ChangeActiveState = "distribucio_UserRole_ChangeActiveState";
    }
}
