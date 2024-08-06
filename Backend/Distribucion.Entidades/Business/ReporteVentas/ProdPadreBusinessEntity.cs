using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business.ReporteVentas
{
    public class ProdPadreBusinessEntity
    {
        public string Fecha { get; set; }
        public string FechaReserva { get; set; }
        public int SectorId { get; set; }
        public int VentaId { get; set; }
        public int ClienteId { get; set; }
        public string SectorName { get; set; } 
        public string Descripcion { get; set; }
        public string ClienteName { get; set; }
        public int RelevanceValue { get; set; }
        public int ProductParentId { get; set; }
        public string ProductParentName { get; set; }
        public int ProductId { get; set; }
        public string ProductName{ get; set; }
        public decimal CantidadVenta { get; set; }
        public decimal CantidadVentaEstandar { get; set; }
        public decimal CantidadCompra { get; set; }
        public decimal CantidadCompraEstandar { get; set; }
        public string UnidadMedida { get; set; }
        public decimal PrecioIngresadoVenta { get; set; }
        public decimal Amortizacion { get; set; }
        public decimal Stock { get; set; }
        public decimal StockSobrante { get; set; }
        public decimal StockInicial { get; set; }
        public string UsuarioId { get; set; }
        public string Observacion { get; set; }
        public string adelanto { get; set; }
    }
}
