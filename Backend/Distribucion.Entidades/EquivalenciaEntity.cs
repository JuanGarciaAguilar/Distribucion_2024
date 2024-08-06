using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class EquivalenciaEntity
    {
        public int EquivalenciaId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string UnidadBase { get; set; }
        public decimal CantidadObjetos { get; set; }
        public string UnidadDestino { get; set; }
        public Boolean Estado { get; set; }
        public decimal FleteUnitario { get; set; }
       
    }
}
