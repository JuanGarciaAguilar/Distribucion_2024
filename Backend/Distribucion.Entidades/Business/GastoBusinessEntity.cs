using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class GastoBusinessEntity
    {
        public int GastoSemanalId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinal { get; set; }
        public decimal GastoTotal { get; set; }
        public int GastoSemanalDetalleId { get; set; }
        public string Insumo { get; set; }
        public decimal Gasto { get; set; }
        public string Comentario { get; set; }
        public string userId { get; set; }
    }
}
