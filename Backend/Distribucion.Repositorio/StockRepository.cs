using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class StockRepository : IStockRepository
    {
        private readonly IDapperHelper dapperHelper;

        public StockRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<StockEntity>> GetStockAll()
        {
            List<StockEntity> packet = new List<StockEntity>();
            packet = await dapperHelper.ExecuteSP_Multiple<StockEntity>(SpGetStockAll.distribucion_Stock_GetAll);
            return packet;
        }

        public async Task<List<StockEntity>> GetStockAllFechas(string fechainicio)
        {
            List<StockEntity> packet = new List<StockEntity>();
            packet = await dapperHelper.ExecuteSP_Multiple<StockEntity>(SpGetStockAll.distribucion_Stock_GetAll_Fechas, new
            {
                @fechainicio = fechainicio
            }
                );
            return packet;
        }

        public async Task<List<MoneyRepBusinessEntity>> GetStockAmortizacionDeuda()
        {
            List <MoneyRepBusinessEntity> x = await dapperHelper.ExecuteSP_Multiple<MoneyRepBusinessEntity>(SpGetMoneyReporte.distribucion_Reporte_GetAmortizacionDeuda);
            MoneyRepBusinessEntity total = new MoneyRepBusinessEntity();
            //decimal totalAmort = 0;
            //decimal totalDeuda = 0;
            //foreach (MoneyRepBusinessEntity item in x)
            //{
            //    totalAmort = item.Amortizacion + totalAmort;
            //    totalDeuda = item.DeudaActualizada + totalDeuda;
            //}
            //total.SectorName = "TOTAL";
            //total.Amortizacion = totalAmort;
            //total.DeudaActualizada = totalDeuda;
            //x.Add(total);
            return x;
        }

        public async Task<List<MoneyRepBusinessEntity>> GetStockAmortizacionDeudaFechas(string fechainicio)
        {
            List<MoneyRepBusinessEntity> x = await dapperHelper.ExecuteSP_Multiple<MoneyRepBusinessEntity>(SpGetMoneyReporte.distribucion_Reporte_GetAmortizacionDeuda_Fechas, new
            {
                @fechainicio = fechainicio
            } );
            MoneyRepBusinessEntity total = new MoneyRepBusinessEntity();
            //decimal totalAmort = 0;
            //decimal totalDeuda = 0;
            //foreach (MoneyRepBusinessEntity item in x)
            //{
            //    totalAmort = item.Amortizacion + totalAmort;
            //    totalDeuda = item.DeudaActualizada + totalDeuda;
            //}
            //total.SectorName = "TOTAL";
            //total.Amortizacion = totalAmort;
            //total.DeudaActualizada = totalDeuda;
            //x.Add(total);
            return x;
        }

        public async Task<StockPrecioBusinessEntity> GetStockById(int id)
        {
            return await dapperHelper.ExecuteSP_Single<StockPrecioBusinessEntity>(Stock.distribucion_Stock_GetDataById, new
            {
                @ProductId = id
            });
        }

        public async Task<string> GetStockCapitalTotal()
        {
            return await dapperHelper.ExecuteSP_Single<string>(SpGetStockCapitalTotal.distribucion_Stock_GetTotalCapital);
        }

        public async Task<List<ReporteSaldoDepositoEntity>> GetReporteSaldoDeposito()
        {
            List<ReporteSaldoDepositoEntity> saldoDepositoList = await dapperHelper.ExecuteSP_Multiple<ReporteSaldoDepositoEntity>(SpGetReporteSaldoDeposito.distribucion_Reporte_SaldoDeposito);
            ReporteSaldoDepositoEntity total = new ReporteSaldoDepositoEntity();
            decimal totalValor = 0;
            foreach (ReporteSaldoDepositoEntity item in saldoDepositoList)
            {
                totalValor = totalValor + item.SaldoDeposito;
            }
            total.ProveedorName = "TOTAL";
            total.SaldoDeposito = totalValor;
            saldoDepositoList.Add(total);
            return saldoDepositoList;
        }

        public async Task<List<ReporteEstadoFinanciero>> GetEfectivo(string fechainicio)
        {
            return await dapperHelper.ExecuteSP_Multiple<ReporteEstadoFinanciero>(SpGetMoneyReporte.distribucion_Reporte_GetEfectivo, new
            {
                @fechainicio = fechainicio
            });
        }

        public async Task<List<ReporteEstadoFinanciero>> GetEfectivoAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<ReporteEstadoFinanciero>(SpGetMoneyReporte.distribucion_Reporte_GetEfectivoAll);
        }

        public async Task<List<ReporteEstadoFinanciero>> GetEstadoFinanciero()
        {
            return await dapperHelper.ExecuteSP_Multiple<ReporteEstadoFinanciero>(SpGetMoneyReporte.distribucion_Reporte_GetEstadoFinanciero);
        }
    }
}
