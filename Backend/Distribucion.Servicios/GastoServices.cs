using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class GastoServices : IGastoServices
    {
        private readonly IGastoRepository gastoRepository;

        public GastoServices(IGastoRepository gastoRepository)
        {
            this.gastoRepository = gastoRepository;
        }

        public async Task GastoSemanalInsert(GastoEntity gasto)
        {
            await gastoRepository.GastoSemanalInsert(gasto);
        }

        public async Task<List<GastoEntity>> GetGastoAll()
        {
            return await gastoRepository.GetGastoAll();
        }

        public async Task<List<GastoDetalleEntity>> GetGastoById(int id)
        {
            return await gastoRepository.GetGastoById(id);
        }

        public async Task UpdateGastoSemanal(GastoEntity gasto)
        {
            await gastoRepository.UpdateGastoSemanal(gasto);
        }

        public async Task DeleteGastoSemanal(int id)
        {
            await gastoRepository.DeleteGastoSemanal(id);
        }

        public async Task<List<ReporteGastoBusinessEntity>> GetGastoDetalleSemanal(string ini, string fin)
        {
            return await gastoRepository.GetGastoDetalleSemanal(ini, fin);
        }

        public async Task<List<GastoEntity>> GetGastoHastaHoy()
        {
            return await gastoRepository.GetGastoHastaHoy();
        }

        public async Task<List<GastoEntity>> GetGastoHastaHoyFechas(string Finicio)
        {
            return await gastoRepository.GetGastoHastaHoyFechas(Finicio);
        }

        public async Task<string> GetGastoTotalPeriodo(DateTime ini, DateTime fin)
        {
            return await gastoRepository.GetGastoTotalPeriodo(ini, fin);
        }
    }
}
