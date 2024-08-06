using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Entidades.Business.ReporteVentas;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class VentaServices : IVentaServices
    {
        private readonly IVentaRepository ventaRepository;

        public VentaServices(IVentaRepository ventaRepository)
        {
            this.ventaRepository = ventaRepository;
        }

        public async Task EliminaVenta(int VentaId)
        {
            try
            {
                await ventaRepository.EliminaVenta(VentaId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task EliminaVentaAll(int VentaId)
        {
            try
            {
                await ventaRepository.EliminaVentaAll(VentaId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProdPadreBusinessEntity>> GetReporteVentas(string fIni, string fFin, int productid)
        {
            try
            {
                return await ventaRepository.GetReporteVentas(fIni, fFin, productid);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProdPadreBusinessEntity>> GetReportePagos(DateTime fIni, DateTime fFin, int productid)
        {
            try
            {
                return await ventaRepository.GetReportePagos(fIni, fFin, productid);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ReporteCierreDiarioEntity>> GetReporteCierreDiario(DateTime fIni, int cSector)
        {
            try
            {
                return await ventaRepository.GetReporteCierreDiario(fIni, cSector);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ReporteCierreDiarioCabeceraEntity>> GetReporteCierreDiarioCabecera()
        {
            try
            {
                return await ventaRepository.GetReporteCierreDiarioCabecera();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<string> GetVentaDeudaAnterior(int idCliente, int idProducto)
        {
            return await ventaRepository.GetVentaDeudaAnterior(idCliente, idProducto);
        }

        public async Task<int> GetVentaDeudaTotalByCliente(int idCliente)
        {
            return await ventaRepository.GetVentaDeudaTotalByCliente(idCliente);            
        }
    



        public async Task<List<ProdPadreBusinessEntity>> GetVentasAll()
        {
            return await ventaRepository.GetVentasAll();
        }

        public async Task<List<ProdPadreBusinessEntity>> GetReservaAll()
        {
            return await ventaRepository.GetReservaAll();
        }

        public async Task<List<ProdPadreBusinessEntity>> Reservas_GetAll_byFecha(string fecha)
        {
            return await ventaRepository.GetReservaAllByFecha(fecha);
        }
        public async Task<List<ProdPadreBusinessEntity>> ListaReservaCantidadDay(string fecha)
        {
            return await ventaRepository.ListaReservaCantidadDay(fecha);
        }

        public async Task<List<VentaBusinessEntity>> GetVentasByCliente(int ClienteId)
        {
            return await ventaRepository.GetVentasByCliente(ClienteId);
        }
        public async Task<List<VentaBusinessEntity>> GetVentasAnuladasByCliente(int ClienteId)
        {
            return await ventaRepository.GetVentasAnuladasByCliente(ClienteId);
        }

        public async Task<List<VentaBusinessEntity>> GetReservasByCliente(int ClienteId)
        {
            return await ventaRepository.GetReservasByCliente(ClienteId);
        }

        public async Task<List<VentaBusinessEntity>> GetPagosByCliente(int ClienteId)
        {
            return await ventaRepository.GetPagosByCliente(ClienteId);
        }

        public async Task InsertVenta(VentaEntity venta)
        {
            try
            {
                await ventaRepository.InsertVenta(venta);
            }
            catch (Exception e)
            {

                throw e;
            }
            
        }
        public async Task InsertVentaAnulada(VentaEntity venta)
        {
            try
            {
                await ventaRepository.InsertVentaAnulada(venta);
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task UpdateVenta(VentaEntity venta)
        {
            try
            {
                await ventaRepository.UpdateVenta(venta);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task RegistrarReserva(List<VentaEntity> venta)
        {
            try
            {
                await ventaRepository.RegistrarReserva(venta);
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public async Task<List<VentaEntity>> GetVentaById(int ventaid)
        {
            return await ventaRepository.GetVentasById(ventaid);
        }

        public async Task<List<dynamic>> Venta_GetByClienteFecha(string fIni, string fFin, int clienteid)
        {
            try
            {
                return await ventaRepository.Venta_GetByClienteFecha(fIni, fFin, clienteid);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
