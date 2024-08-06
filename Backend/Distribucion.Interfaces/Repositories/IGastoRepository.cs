using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IGastoRepository
    {
        Task GastoSemanalInsert(GastoEntity gasto);

        Task<List<GastoEntity>> GetGastoHastaHoy();

        Task<List<GastoEntity>> GetGastoHastaHoyFechas(string Finicio);

        Task<List<GastoEntity>> GetGastoAll();

        Task<List<GastoDetalleEntity>> GetGastoById(int id);

        Task UpdateGastoSemanal(GastoEntity gasto);

        Task DeleteGastoSemanal(int id);

        Task<List<ReporteGastoBusinessEntity>> GetGastoDetalleSemanal(string ini, string fin);

        Task<string> GetGastoTotalPeriodo(DateTime ini, DateTime fin);
    }
}
