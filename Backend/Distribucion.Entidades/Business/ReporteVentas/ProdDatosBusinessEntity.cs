using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business.ReporteVentas
{
    public class ProdDatosBusinessEntity
    {
        public string Tipo { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Venta { get; set; }
    }
}
