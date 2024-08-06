using Distribucion.Security.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Security.Contract
{
    public interface IUserService
    {
        Task<List<UserEntity>> GetAll();
        //Task<List<UserEntity>> GetActive();
       // Task ChangeActiveStateUser(string UserId);
        Task InsertUser(UserEntity U);
        //Task UpdateUser(UserEntity U);
        //Task DeleteUser(string UserId);
        //Task PasswordChangeUser(string UserId);
        //Task<UserEntity> Login(UserEntity U);
    }
}
