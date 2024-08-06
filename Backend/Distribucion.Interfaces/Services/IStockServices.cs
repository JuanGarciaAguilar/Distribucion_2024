using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IStockServices
    {
        Task<List<StockEntity>> GetStockAll();

        Task<List<StockEntity>> GetStockAllFechas(string fechainicio);
        Task<string> GetStockCapitalTotal();

        Task<List<MoneyRepBusinessEntity>> GetStockAmortizacionDeuda();
        Task<List<MoneyRepBusinessEntity>> GetStockAmortizacionDeudaFechas(string fechainicio);

        Task<StockPrecioBusinessEntity> GetStockById(int id);

        Task<List<ReporteSaldoDepositoEntity>> GetReporteSaldoDeposito();

        Task<List<ReporteEstadoFinanciero>> GetEfectivo(string fechainicio);
        Task<List<ReporteEstadoFinanciero>> GetEfectivoAll();
        Task<List<ReporteEstadoFinanciero>> GetEstadoFinanciero();
    }
}
