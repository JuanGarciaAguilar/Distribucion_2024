using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class OperacionEntity
    {
        public int IdOperacion { get; set; }
        public DateTime FechaOperacion { get; set; }
        public int Unidades { get; set; }
        public double PesoTotal { get; set; }
        public double PrecioPorKilo { get; set; }
        public double PrecioTotal { get; set; }
        public double MontoPagado { get; set; }
        public double DeudaAcumulada { get; set; }
        public double SaldoAcumulado { get; set; }
        public double DeudaAnterior { get; set; }
    }
}
