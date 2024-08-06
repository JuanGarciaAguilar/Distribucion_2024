using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class StockServices : IStockServices
    {
        private readonly IStockRepository stockRepository;

        public StockServices(IStockRepository stockRepository)
        {
            this.stockRepository = stockRepository;
        }

        public async Task<List<StockEntity>> GetStockAll()
        {
            return await stockRepository.GetStockAll();
        }

        public async Task<List<StockEntity>> GetStockAllFechas(string fechainicio)
        {
            return await stockRepository.GetStockAllFechas(fechainicio);
        }

        public async Task<List<MoneyRepBusinessEntity>> GetStockAmortizacionDeuda()
        {
            return await stockRepository.GetStockAmortizacionDeuda();
        }

        public async Task<List<MoneyRepBusinessEntity>> GetStockAmortizacionDeudaFechas(string fechainicio)
        {
            return await stockRepository.GetStockAmortizacionDeudaFechas(fechainicio);
        }

        public async Task<StockPrecioBusinessEntity> GetStockById(int id)
        {
            return await stockRepository.GetStockById(id);
        }

        public async Task<string> GetStockCapitalTotal()
        {
            return await stockRepository.GetStockCapitalTotal();
        }

        public async Task<List<ReporteSaldoDepositoEntity>> GetReporteSaldoDeposito()
        {
            return await stockRepository.GetReporteSaldoDeposito();
        }

        public async Task<List<ReporteEstadoFinanciero>> GetEfectivo(string fechainicio)
        {
            return await stockRepository.GetEfectivo(fechainicio);
        }
        public async Task<List<ReporteEstadoFinanciero>> GetEfectivoAll()
        {
            return await stockRepository.GetEfectivoAll();
        }

        public async Task<List<ReporteEstadoFinanciero>> GetEstadoFinanciero()
        {
            return await stockRepository.GetEstadoFinanciero();
        }
    }
}
