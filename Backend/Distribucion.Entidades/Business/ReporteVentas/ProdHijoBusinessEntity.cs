using Distribucion.Entidades.Business.ReporteVentas;
using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Entidades.Business
{
    public class ProdHijoBusinessEntity
    {
        public int ProductId { get; set; }
        public List<ProdDatosBusinessEntity> ListaDatos {get;set;}
    }
}
