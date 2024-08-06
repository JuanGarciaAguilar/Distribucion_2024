using System;
using System.Collections.Generic;
using System.Text;
using Distribucion.Interfaces;
using Distribucion.Entidades;
using System.Threading.Tasks;
using Distribucion.Common.StoredProcedures;

namespace Distribucion.Repositorio
{
    public class OperacionRepository : IOperacionRepository
    {
        private readonly IDapperHelper dapperHelper;

        public OperacionRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<OperacionEntity>> GetAllOperaciones(int cliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return await dapperHelper.ExecuteSP_Multiple<OperacionEntity>(SpGetOperaciones.mobile_GetReporteDeudaByClienteFecha, new
            {
                @Cliente = cliente,
                @FechaDesde = fechaDesde,
                @FechaHasta = fechaHasta
            });
        }
            
        public async Task<List<OperacionDiariaEntity>> GetOperacionesByDia(int sector, DateTime dateFind)
        {
            return await dapperHelper.ExecuteSP_Multiple<OperacionDiariaEntity>(GetOperacionesDiarias.mobile_GetReporteDetallado, new
            {
                @Sector = sector,
                @FechaReporte = dateFind
            });
        }
    }
}
