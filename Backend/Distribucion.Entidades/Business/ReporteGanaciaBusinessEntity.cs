using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteGanaciaBusinessEntity
    {
        public int ProductId { get; set; }
        public int RelevanceValue { get; set; }
        public int ProductParentId { get; set; }
        public string ProductParentName { get; set; }
        public string ProductName { get; set; }
        public string UnidadMedida { get; set; }
        public decimal CompraCantidad { get; set; }
        public decimal CompraPrecio { get; set; }
        public decimal CompraTotal { get; set; }
        public decimal VentaCantidad { get; set; }
        public decimal VentaPrecio { get; set; }
        public decimal VentaTotal { get; set; }
        public decimal GananciaParcial { get; set; }
        public decimal Flete { get; set; }
        public decimal GananciaTotal { get; set; }
    }
}
