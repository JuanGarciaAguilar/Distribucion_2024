using Distribucion.Security.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Contract
{
    public interface IUserRoleService
    {
        Task<List<UserRoleEntity>> GetAll();
        Task<List<UserRoleEntity>> GetActive();
        Task InsertUserRole(UserRoleEntity UR);
        Task UpdateUserRole(UserRoleEntity UR);
        Task DeleteUserRole(int UserRoleId);
        Task ChangeActiveStateUserRole(int UserRoleId);
    }
}
