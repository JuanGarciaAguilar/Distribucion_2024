using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class CompraDetalleEntity
    {
        public int DetalleCompraId { get; set; } 
        public int CompraId { get; set; }
        public int ProveedorId { get; set; }
        public int ProductId { get; set; }
        public decimal CantidadCompra { get; set; }
        public decimal PesoCompra { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal TotalDeposito { get; set; }
        public decimal SaldoDeposito { get; set; }
        public decimal CostoFleteItemCompra { get; set; }
        //public decimal CantidadBuenEstado { get; set; }
        //public decimal CantidadMalEstado { get; set; }
        public string DocumentoCompra { get; set; }
        public decimal CantidadMinima { get; set; }
        public string UnidadMedida { get; set; }
        public int CompraEstado{ get; set; }
        public string NumeroDocumento { get; set; }
        public string OpcionConfirmar { get; set; }

    }

    public class CostoEntity
    {
        public int ProductId { get; set; }
        public string FechaCompra { get; set; }
        public decimal TotalPrecioCompra { get; set; }
        public decimal TotalFleteCompra { get; set; }
        public decimal TotalCantidadCompra { get; set; }
        public decimal Stock { get; set; }
        public decimal Costo { get; set; }
        public decimal ValorTotal { get; set; } 
        public decimal equivalenciamayor { get; set; }

    }
}
