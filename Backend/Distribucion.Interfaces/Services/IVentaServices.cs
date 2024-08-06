using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Entidades.Business.ReporteVentas;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IVentaServices
    {
        Task<List<ProdPadreBusinessEntity>> GetVentasAll();
        Task<List<ProdPadreBusinessEntity>> Reservas_GetAll_byFecha(string fecha);
        Task<List<ProdPadreBusinessEntity>> GetReservaAll();
         Task<List<VentaEntity>> GetVentaById(int ventaid);
        Task<List<ProdPadreBusinessEntity>> ListaReservaCantidadDay(string fecha);

        Task<List<VentaBusinessEntity>> GetVentasByCliente(int ClienteId);
        Task<List<VentaBusinessEntity>> GetVentasAnuladasByCliente(int ClienteId);
        Task<List<VentaBusinessEntity>> GetReservasByCliente(int ClienteId);
        Task<List<VentaBusinessEntity>> GetPagosByCliente(int ClienteId);

        Task InsertVenta(VentaEntity venta);
        Task InsertVentaAnulada(VentaEntity venta);
        Task UpdateVenta(VentaEntity venta);

        Task RegistrarReserva(List<VentaEntity> venta);

        Task<string> GetVentaDeudaAnterior(int idCliente, int idProducto);

        Task<int> GetVentaDeudaTotalByCliente(int idCliente);

        Task<List<ProdPadreBusinessEntity>> GetReporteVentas(string fIni, string fFin, int productid);
        Task<List<ProdPadreBusinessEntity>> GetReportePagos(DateTime fIni, DateTime fFin, int productid);


        Task<List<ReporteCierreDiarioEntity>> GetReporteCierreDiario(DateTime fIni, int cSector);

        Task<List<ReporteCierreDiarioCabeceraEntity>> GetReporteCierreDiarioCabecera();

        Task EliminaVenta(int VentaId);
        Task EliminaVentaAll(int VentaId);

        Task<List<dynamic>> Venta_GetByClienteFecha(string fIni, string fFin, int productid);
    }

}
