using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class StockEntity
    {
        public int ProductParentId { get; set; }
        public string ProductParentName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string UnidadMedida { get; set; }
        public decimal CantidadIngresada { get; set; }
        public decimal CantidadActualStockFechaRelativa { get; set; }
        public decimal CantidadStockPrevioCompra { get; set; }
        public decimal StockRealActual { get; set; }
        public decimal CantidadActualStock { get; set; }
        public decimal CostoUnitarioCompra { get; set; }
        public decimal CostoCompra { get; set; }
        public decimal CostoFleteUnitario { get; set; }
        public decimal CostoFlete { get; set; }
        public decimal CostoUnitarioTotal { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime FechaStock { get; set; }
        
        public decimal CantidadActualStockNETO { get; set; }
    }
}
