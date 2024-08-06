using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class UsuarioServices : IUsuarioServices
    {
        private readonly IUsuarioRepository usuarioRepository;

        public UsuarioServices(IUsuarioRepository usuarioRepository)
        {
            this.usuarioRepository = usuarioRepository;
        }

        public async Task DeleteUsuario(string UserId)
        {
            await usuarioRepository.DeleteUsuario(UserId);
        }

        public async Task<List<UsuarioEntity>> GetAll()
        {
            return await usuarioRepository.GetAll();
        }

        public async Task InsertUsuario(UsuarioEntity U)
        {
            await usuarioRepository.InsertUsuario(U);
        }

        public async Task<UsuarioEntity> Login(UsuarioEntity u)
        {
            try
            {
                return await usuarioRepository.Login(u);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task UpdateUsuario(UsuarioEntity U)
        {
            await usuarioRepository.UpdateUsuario(U);
        }
    }
}
