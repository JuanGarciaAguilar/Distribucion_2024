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
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly IDapperHelper dapperHelper;

        public UserRoleRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<UserRoleEntity>> GetAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<UserRoleEntity>(UserRole.distribucion_UserRole_GetAll);
        }
                
        public async Task<List<UserRoleEntity>> GetActive()
        {
            return await dapperHelper.ExecuteSP_Multiple<UserRoleEntity>(UserRole.distribucion_UserRole_GetActive);
        }

        public async Task InsertUserRole(UserRoleEntity UR)
        {
            await dapperHelper.ExecuteSPonly(UserRole.distribucion_UserRole_Insert, new
            {
                @UserID = UR.UserID,
                @RoleID = UR.RoleID,
                @CreationUser = UR.CreationUser
            });
        }

        public async Task UpdateUserRole(UserRoleEntity UR)
        {
            await dapperHelper.ExecuteSPonly(UserRole.distribucion_UserRole_Update, new
            {
                @UserRoleID = UR.UserRoleID,
                @UserID = UR.UserID,
                @RoleID = UR.RoleID,
                @CreationUser = UR.CreationUser
            });
        }

        public async Task DeleteUserRole(int UserRoleID)
        {
            await dapperHelper.ExecuteSPonly(UserRole.distribucion_UserRole_Delete, new
            {
                @UserRoleID = UserRoleID
            });
        }

        public async Task ChangeActiveStateUserRole(int UserRoleID)
        {
            await dapperHelper.ExecuteSPonly(UserRole.distribucion_UserRole_ChangeActiveState, new
            {
                @UserRoleID = UserRoleID
            });
        }


    }
}
