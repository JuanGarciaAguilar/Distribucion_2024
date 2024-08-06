using System;
using System.Collections.Generic;
using System.Text;

namespace Distribucion.Common.StoredProcedures
{
    public class SpGetVentaAll
    {
        public const string distribucion_Venta_GetAll = "distribucion_Venta_GetAll";
        public const string Reservas_GetAll = "distribucion_Reserva_GetAll";
        public const string Reservas_GetAll_byFecha = "distribucion_Reserva_byFecha";
        public const string Insert = "distribucion_Venta_insertar";
        public const string InsertAnulados = "distribucion_Venta_insertar_anulacion";
        //public const string Insert = "distribucion_Venta_Insert";
        public const string Update = "distribucion_Venta_Update";
        public const string Reserva = "distribucion_Venta_Reserva";
        public const string InsertReserva = "distribucion_Venta_Insert_Reserva";
        
        public const string ListaReservaCantidadDay = "distribucion_ListaReservaCantidad";
        public const string distribucion_Venta_GetByCliente = "distribucion_Venta_GetByCliente";
        public const string distribucion_Venta_Anuladas_GetByCliente = "distribucion_Venta_Anuladas_GetByCliente";
        public const string distribucion_Reserva_GetByCliente = "distribucion_Reserva_GetByCliente";
        public const string distribucion_Deuda_GetByCliente = "distribucion_Venta_GetDeudaByCliente";
        public const string distribucion_Venta_By_Id = "distribucion_Venta_GetById";
    }
}
