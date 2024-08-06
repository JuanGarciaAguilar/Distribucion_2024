using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class CompraEntity
    {
        public int CompraId { get; set; }
        public DateTime FechaCompra { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string OrigenCompra { get; set; }
        public decimal TotalCompra { get; set; }
        public decimal CostoFlete { get; set; }
        public string UsuarioId { get; set; }
        public string ProveedorName { get; set; }
        public string Observacion { get; set; }
        public List<CompraDetalleEntity> CompraDetalleTabla { get; set; }
    }
}
