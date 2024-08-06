using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<List<UsuarioEntity>> GetAll();
        Task InsertUsuario(UsuarioEntity U);
        Task UpdateUsuario(UsuarioEntity U);
        Task DeleteUsuario(string UserId);
        Task<UsuarioEntity> Login(UsuarioEntity u);
    }
}
