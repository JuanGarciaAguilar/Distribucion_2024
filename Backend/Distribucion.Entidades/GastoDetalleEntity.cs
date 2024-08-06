using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class GastoDetalleEntity
    {
        public int GastoSemanalDetalleId { get; set; }
        public int GastoSemanalId { get; set; }
        public string Insumo { get; set; }
        public decimal Gasto { get; set; }
        public string Comentario { get; set; }

        public string userId { get; set; }
    }
}
