using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteEstadoFinanciero
    {
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public Decimal Monto { get; set; }
    }
}
