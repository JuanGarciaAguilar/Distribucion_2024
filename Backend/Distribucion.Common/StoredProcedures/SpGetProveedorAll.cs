using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Common.StoredProcedures
{
    public class Proveedor
    {
        public const string GetAll = "distribucion_Proveedor_GetAll";
        public const string GetAllCiudad = "distribucion_Proveedor_GetAll_Cuidad";
        public const string GetCiudadAll = "distribucion_Proveedor_Ciudad";
        public const string Insert = "distribucion_Proveedor_Insert";
        public const string Update = "distribucion_Proveedor_Update";
        public const string Delete = "distribucion_Proveedor_Delete";
        public const string GetNewCiudades = "distribucion_Proveedor_Ciudad";
        public const string InsertCiudades = "distribucion_Ciudad_Insert";
        public const string UpdateCiudades = "distribucion_Ciudad_Update";

    }
}
