using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class CompraRepBusinessEntity
    {
        //Enitdad creada para Reporte Ventas
        public string ProductParentName { get; set; }
        public string ProveedorName { get; set; }
        public string ProductName { get; set; }
        public int ProductParentId { get; set; }
        public decimal CantidadCompra { get; set; }
        public string UnidadMedida { get; set; }
        public decimal PesoCompra { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal TotalDeposito { get; set; }
        public decimal SaldoDeposito { get; set; }
        public decimal CostoFleteItemCompra { get; set; }
        public decimal CantidadBuenEstado { get; set; }
        public decimal CantidadMalEstado { get; set; }
        public string UsuarioId { get; set; }
        public DateTime FechaCompra { get; set; }
        public DateTime FechaEntrega { get; set; }
        public int OrigenCompra { get; set; }
        public string DocumentoCompra { get; set; }
        public string NumeroDocumento { get; set; }
        public int CompraEstado { get; set; }
        public string Observacion { get; set; }
    }
}
