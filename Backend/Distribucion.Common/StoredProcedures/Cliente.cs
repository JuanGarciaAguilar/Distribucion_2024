using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Common.StoredProcedures
{
    public class Cliente
    {
        public const string distribucion_Cliente_GetAll = "distribucion_Cliente_GetAll";
        public const string distribucion_Cliente_GetBySector = "distribucion_Cliente_GetBySector";
        public const string distribucion_Cliente_Insert = "distribucion_Cliente_Insert";
        public const string distribucion_Cliente_ActualizaPago = "distribucion_Cliente_ActualizaPago";
        public const string distribucion_Cliente_ActualizaAdelanto = "distribucion_Cliente_ActualizaAdelanto";
        public const string distribucion_Cliente_GetDeudaByClient = "distribucion_Cliente_GetDeudaByClient";
        public const string distribucion_ValidarCliente = "distribucion_ValidarCliente";
        public const string distribucion_Cliente_TotalBySector = "distribucion_Cliente_TotalBySector";
    }
}
