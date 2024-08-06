using Distribucion.Security.Contract;
using Distribucion.Security.Entity;
using Distribucion.Security.Common;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDapperHelper dapperHelper;
        public UserRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<UserEntity>> GetAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<UserEntity>(User.distribucion_User_GetAll);
        }

        public async Task InsertUser(UserEntity U)
        {
            await dapperHelper.ExecuteSPonly(User.distribucion_User_Insert, new
            {

                //@UserID = U.UserFullName,
                //@FullName = U.UserFullName,
                @Password = U.UserPassword,
                @Email = U.UserEmail,
                @Phone = U.UserPhone,
                //@RoleDescription = U.UserRoleDescription
            });
        }
    }
}
