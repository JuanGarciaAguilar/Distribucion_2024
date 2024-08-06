using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class GastoDetalleRepository : IGastoDetalleRepository
    {
        private readonly IDapperHelper dapperHelper;

        public GastoDetalleRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<GastoDetalleEntity>> GetGastoDetalleById(int id)
        {
            return await dapperHelper.ExecuteSP_Multiple<GastoDetalleEntity>(SpGetGastoDetalleByGastoId.distribucion_GastoSemanalDetalle_GetByGastoId, new
            {
                @GastoSemanalId = id
            });
        }
    }
}
