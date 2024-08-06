using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class CompraEquivalenciaEntity
    {
        public int DetalleCompraId { get; set; }
        public int CantidadCompra { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal CostoFleteItemCompra { get; set; }
        public string UnidadBase { get; set; }
        public decimal cantidadObjetos { get; set; }
        public string UnidadDestino { get; set; }
        public string UnidadMedida { get; set; }
        // variable creada para utilizar de update venta
        public decimal CantidadActualStock { get; set; }
        public decimal PrecioComprasinflete { get; set; }
        public decimal CantidadIngresada { get; set; } 
        public decimal ObjetosUnidadMedida { get; set; }

        public decimal EquivalenciaMayor { get; set; }
        public decimal costo { get; set; }
    }
}
