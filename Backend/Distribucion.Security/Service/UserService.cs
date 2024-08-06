using Distribucion.Security.Contract;
using Distribucion.Security.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IRoleRepository roleRepository)
        {
            this.userRepository = userRepository;
        }
        
        //public async Task ChangeActiveStateUser(string UserId)
        //{
        //    await userRepository.ChangeActiveStateUser(UserId);
        //}

        //public async Task DeleteUser(string UserId)
        //{
        //    await userRepository.DeleteUser(UserId);
        //}

        //public async Task<List<UserEntity>> GetActive()
        //{
        //    return await userRepository.GetActive();
        //}
        
        public async Task<List<UserEntity>> GetAll()
        {
            return await userRepository.GetAll();
        }

        public async Task InsertUser(UserEntity U)
        {
            await userRepository.InsertUser(U);
        }

        //public async Task<UserEntity> Login(UserEntity U)
        //{
        //    try
        //    {
        //        return await userRepository.Login(U);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        //public async Task PasswordChangeUser(string UserId)
        //{
        //    await userRepository.PasswordChangeUser(UserId);
        //}

        //public async Task UpdateUser(UserEntity U)
        //{
        //    await userRepository.UpdateUser(U);
        //}
    }
}
