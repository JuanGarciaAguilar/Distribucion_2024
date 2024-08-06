using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class ClienteServices_nt : IClienteServices_nt
    {
        private readonly IClienteRepository_nt clienteRepository_nt;
        public ClienteServices_nt(IClienteRepository_nt clienteRepository_nt)
        {
            this.clienteRepository_nt = clienteRepository_nt;
        }

        public async Task<List<ClienteEntity_nt>> GetAllClienteBySector(int sector)
        {
            return await clienteRepository_nt.GetAllClienteBySector(sector);
        }

        public async Task<List<ClienteEntity_nt>> GetAllCliente_ntAsync()
        {
            return await clienteRepository_nt.GetAllCliente_nt();
        }

        public async Task<List<DeudaSectorBusinessEntity>> GetDeudaClientesBySector()
        {
            return await clienteRepository_nt.GetDeudaClientesBySector();
        }
    }
}
