using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Security.Common
{
    public class User
    {
        public const string distribucion_User_GetAll = "distribucion_User_GetAll"; //It is to obtain a list of all users of the Database
        public const string distribucion_User_GetActive = "distribucion_User_GetActive"; //It is to obtain a list of all users with status 1 = Active
        public const string distribucion_User_ChangeActiveState = "distribucion_User_ChangeActiveState";
        public const string distribucion_User_Insert = "distribucion_User_Insert";
        public const string distribucion_User_Update = "distribucion_User_Update";
        public const string distribucion_User_Delete = "distribucion_User_Delete";
        public const string distribucion_User_PasswordChange = "distribucion_User_PasswordChange";
        public const string distribucion_User_Login = "distribucion_User_Login";
    }
}
