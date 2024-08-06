using Distribucion.Security.Contract;
using Distribucion.Security.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Service
{
    public class UserRoleService : IUserRoleService
    {
        private readonly IUserRoleRepository userRoleRepository;

        public UserRoleService(IUserRoleRepository userRoleRepository)
        {
            this.userRoleRepository = userRoleRepository;
        }

        public async Task InsertUserRole(UserRoleEntity UR)
        {
            await userRoleRepository.InsertUserRole(UR);
        }

        public async Task UpdateUserRole(UserRoleEntity UR)
        {
            await userRoleRepository.UpdateUserRole(UR);
        }
        public async Task DeleteUserRole(int UserRoleId)
        {
            await userRoleRepository.DeleteUserRole(UserRoleId);
        }
        public async Task ChangeActiveStateUserRole(int UserRoleId)
        {
            await userRoleRepository.ChangeActiveStateUserRole(UserRoleId);
        }
        public async Task<List<UserRoleEntity>> GetAll()
        {
            return await userRoleRepository.GetAll();
        }
        public async Task<List<UserRoleEntity>> GetActive()
        {
            return await userRoleRepository.GetActive();
        }
    }
}
