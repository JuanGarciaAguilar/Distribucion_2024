using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class GastoEntity
    {
        public int GastoSemanalId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinal { get; set; }
        public decimal GastoTotal { get; set; }
        public List<GastoDetalleEntity> GastoSemanalTabla{ get; set; }
    }
}
