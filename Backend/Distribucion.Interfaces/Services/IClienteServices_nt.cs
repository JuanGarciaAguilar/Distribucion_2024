using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IClienteServices_nt
    {
        Task<List<ClienteEntity_nt>> GetAllCliente_ntAsync();
        Task<List<ClienteEntity_nt>> GetAllClienteBySector(int sector);
        Task<List<DeudaSectorBusinessEntity>> GetDeudaClientesBySector();
    }
}
