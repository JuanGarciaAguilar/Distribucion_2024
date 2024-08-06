using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ReporteGastoBusinessEntity
    {
        public string FechaInicio { get; set; }
        public string FechaFinal { get; set; }
        public int GastoSemanalDetalleId { get; set; }
        public int GastoSemanalId { get; set; }
        public string Insumo { get; set; }
        public decimal Gasto { get; set; }
        public decimal Diesel { get; set; }
        public decimal Casa { get; set; }
        public decimal Ayudante { get; set; }
        public string Personal { get; set; }
        public decimal Otros { get; set; }
        public decimal Sunat { get; set; }
    }
}
