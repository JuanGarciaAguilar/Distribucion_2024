using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteCierreDiarioEntity
    {
        public DateTime FechaVenta { get; set; }
        public string SectorName { get; set; }
        public int ClienteId { get; set; }
        public string ClienteName { get; set; }
        public int ProductParentId { get; set; }
        public string ProductParentName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal CantidadVenta { get; set; }
        public string UnidadMedida { get; set; }
        public decimal Unidades { get; set; }
        public decimal PrecioIngresadoVenta { get; set; }
        public decimal Amortizacion { get; set; }
        public decimal Stock { get; set; }
        public decimal StockSobrante { get; set; }
        public decimal DeudaActualizada { get; set; }
        public decimal Valor { get; set; }
        public decimal Total { get; set; }
        public decimal Saldo { get; set; }
    }
}
