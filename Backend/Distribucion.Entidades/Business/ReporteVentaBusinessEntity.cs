using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteVentaBusinessEntity
    {
        public int ProductParentId { get; set; }
        public int ProductId { get; set; }
        public string Tipo { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Venta { get; set; }
    }
}
