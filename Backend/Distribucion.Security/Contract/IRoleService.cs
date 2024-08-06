using Distribucion.Security.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Contract
{
    public interface IRoleService
    {
        Task<List<RoleEntity>> GetAll();
        Task<List<RoleEntity>> GetActive();
        Task InsertRole(RoleEntity R);
        Task UpdateRole(RoleEntity R);
        Task DeleteRole(int RoleId);
        Task ChangeActiveStateRole(int RoleId);
    }
}
