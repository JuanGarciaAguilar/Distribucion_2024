using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class VentaEntity
    {
        public int VentaId { get; set; }
        public string FechaVenta { get; set; }
        public int ClienteId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal CantidadVenta { get; set; }
        public string UnidadMedida { get; set; }
        public decimal PesoVenta { get; set; }
        public decimal PrecioRealVenta { get; set; }
        public decimal PrecioIngresadoVenta { get; set; }
        public decimal Amortizacion { get; set; }
        public decimal DeudaActualizada { get; set; }
        public string UsuarioId { get; set; }
        public decimal CantidadMinima { get; set; }
        public bool IsReserva { get; set; }
        public string FechaReserva { get; set; } 
        public string Observacion { get; set; }
    }
}
