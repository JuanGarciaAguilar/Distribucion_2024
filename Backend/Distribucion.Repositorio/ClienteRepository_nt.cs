using System;
using System.Collections.Generic;
using System.Text;
using Distribucion.Interfaces;
using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using System.Threading.Tasks;
using Distribucion.Entidades.Business;

namespace Distribucion.Repositorio
{
    public class ClienteRepository_nt : IClienteRepository_nt
    {
        private readonly IDapperHelper dapperHelper;

        public ClienteRepository_nt(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<ClienteEntity_nt>> GetAllClienteBySector(int idSector)
        {
            return await dapperHelper.ExecuteSP_Multiple<ClienteEntity_nt>(Cliente.distribucion_Cliente_GetBySector, new {
                @sectorid = idSector
            });
        }

        public async Task<List<ClienteEntity_nt>> GetAllCliente_nt()
        {
            return await dapperHelper.ExecuteSP_Multiple<ClienteEntity_nt>(Cliente.distribucion_Cliente_GetAll);

        }

        public async Task<List<DeudaSectorBusinessEntity>> GetDeudaClientesBySector()
        {
            return await dapperHelper.ExecuteSP_Multiple<DeudaSectorBusinessEntity>(Cliente.distribucion_Cliente_TotalBySector);
        }
    }
}
