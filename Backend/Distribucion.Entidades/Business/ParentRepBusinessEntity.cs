using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ParentRepBusinessEntity
    {
        public string ProductParentName { get; set; }
        public List<ProveedorRepBusinessEntity> ProveedorDetalles { get; set; }
    }
}
