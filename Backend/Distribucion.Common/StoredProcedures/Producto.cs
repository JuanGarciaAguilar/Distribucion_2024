using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Common.StoredProcedures
{
    public class Producto
    {
        public const string distribucion_Producto_GetAll = "distribucion_Producto_GetAll";
        public const string distribucion_Producto_Padre_GetAll = "distribucion_Producto_Padre_GetAll";
        public const string distribucion_Producto_InsertHijo = "distribucion_Producto_InsertHijo";
        public const string distribucion_Producto_UpdateHijo = "distribucion_Producto_UpdateHijo";
        public const string distribucion_Producto_DeleteHijo = "distribucion_Producto_DeleteHijo";
        public const string distribucion_Producto_InsertPadre = "distribucion_Producto_InsertPadre";
        public const string distribucion_Producto_UpdatePadre = "distribucion_Producto_UpdatePadre";
        public const string distribucion_Producto_DeletePadre = "distribucion_Producto_DeletePadre";
        public const string VALIDACION = "distribucion_ValidarProducto";
        public const string VALIDACIONCAT = "distribucion_ValidarCategoria";
        public const string distribucion_Equivalencia_Delete = "distribucion_Equivalencia_Delete";
    }
}
