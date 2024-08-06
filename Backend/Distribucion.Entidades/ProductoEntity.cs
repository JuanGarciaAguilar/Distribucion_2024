using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades
{
    public class ProductoEntity
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string UnidadMedidad { get; set; }
        public string ProductImage { get; set; }
        public int ProductParentId { get; set; }
        public Int16 ProductLevel { get; set; }
        public string Grupo { get; set; }

        public List<EquivalenciaEntity> EquivalenciaDetalleTabla { get; set; }

    }
}
