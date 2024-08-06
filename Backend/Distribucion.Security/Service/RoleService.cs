using Distribucion.Security.Contract;
using Distribucion.Security.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        public async Task InsertRole(RoleEntity R)
        {
            await roleRepository.InsertRole(R);
        }
        public async Task UpdateRole(RoleEntity R)
        {
            await roleRepository.UpdateRole(R);
        }
        public async Task DeleteRole(int RoleId)
        {
            await roleRepository.DeleteRole(RoleId);
        }
        public async Task ChangeActiveStateRole(int RoleId)
        {
            await roleRepository.ChangeActiveStateRole(RoleId);
        }
        public async Task<List<RoleEntity>> GetAll()
        {
            return await roleRepository.GetAll();
        }
        public async Task<List<RoleEntity>> GetActive()
        {
            return await roleRepository.GetActive();
        }
    }
}
