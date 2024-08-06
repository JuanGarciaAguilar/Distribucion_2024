using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class CompraBusinessEntity
    {
        public int CompraId { get; set; }
        public DateTime FechaCompra { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string OrigenCompra { get; set; }
        public decimal TotalCompra { get; set; }
        public decimal CostoFlete { get; set; }
        public int DetalleCompraId { get; set; }
        public int ProveedorId { get; set; }
        public int ProductId { get; set; }
        public decimal CantidadCompra { get; set; }
        public decimal PesoCompra { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal TotalDeposito { get; set; }
        public decimal SaldoDeposito { get; set; }
        public decimal CostoFleteItemCompra { get; set; }
        public decimal CantidadBuenEstado { get; set; }
        public decimal CantidadMalEstado { get; set; }
        public string DocumentoCompra { get; set; }
        public string UnidadMedida { get; set; }
        public int CantidadMinima { get; set; }
        public int CompraEstado { get; set; }
        public string ProveedorName { get; set; }
        public string Observacion { get; set; }
        public string NumeroDocumento { get; set; }
    }
}
