using Distribucion.Security.Common;
using Distribucion.Security.Entity;
using Distribucion.Security.Contract;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IDapperHelper dapperHelper;

        public RoleRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<RoleEntity>> GetAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<RoleEntity>(Role.distribucion_Role_GetAll);
        }
        public async Task<List<RoleEntity>> GetActive()
        {
            return await dapperHelper.ExecuteSP_Multiple<RoleEntity>(Role.distribucion_Role_GetActive);
        }
        public async Task InsertRole(RoleEntity R)
        {
            await dapperHelper.ExecuteSPonly(Role.distribucion_Role_Insert, new
            {
                @RoleDescription = R.RoleDescription,
                @CreationUser = R.CreationUser
            });
        }
        public async Task UpdateRole(RoleEntity R)
        {
            await dapperHelper.ExecuteSPonly(Role.distribucion_Role_Update, new
            {
                @RoleId = R.RoleID,
                @RoleDescription = R.RoleDescription,
                @UpdateUser = R.UpdateUser
            });
        }
        public async Task DeleteRole(int RoleId)
        {
            await dapperHelper.ExecuteSPonly(Role.distribucion_Role_Delete, new
            {
                @RoleId = RoleId
            });
        }
        public async Task ChangeActiveStateRole(int RoleId)
        {
            await dapperHelper.ExecuteSPonly(Role.distribucion_Role_ChangeActiveState, new
            {
                @RoleId = RoleId
            });
        }
    }
}
