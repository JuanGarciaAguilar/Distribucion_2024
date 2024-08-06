using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ProveedorRepBusinessEntity
    {
        public string ProveedorName { get; set; }
        public List<ProductoRepBusinessEntity> ProductoDetalles { get; set; }
    }
}
