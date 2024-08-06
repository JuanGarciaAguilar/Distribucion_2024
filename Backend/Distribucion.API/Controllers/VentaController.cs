using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Distribucion.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Distribucion.Entidades;
using Distribucion.Entidades.Business;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Venta")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VentaController : Controller
    {
        private readonly IVentaServices ventaServices;

        public VentaController(IVentaServices ventaServices)
        {
            this.ventaServices = ventaServices;
        }

        // GET: api/Venta
        [HttpGet]
        public async Task<JsonResult> GetVentasAll()
        {
            try
            {
                var result = await ventaServices.GetVentasAll();
            return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("Reservas")]
        public async Task<JsonResult> GetReservasAll()
        {
            try
            {
                var result = await ventaServices.GetReservaAll();

                if (result is null)
                {

                }

                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("ReservasByFechas/{fecha}")]
        public async Task<JsonResult> GetReservasAllByFecha(string fecha)
        {
            try
            {
                var result = await ventaServices.Reservas_GetAll_byFecha(fecha);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("VentasById/{ventaid}")]
        public async Task<JsonResult> VentasById(int ventaid)
        {
            try
            {
                var result = await ventaServices.GetVentaById(ventaid);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("ReservasTotalDia/{fecha}")]
        public async Task<JsonResult> ListaReservaCantidadDay(string fecha)
        {
            try
            {
                var result = await ventaServices.ListaReservaCantidadDay(fecha);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        // GET: api/Venta
        [HttpGet("Reporte/{fechaInicio}/{fechaFin}/{producto}")]
        public async Task<JsonResult> GetReporteVentas(string fechaInicio, string fechaFin, int producto)
        {
            try
            {
                //DateTime fechaInicio = Convert.ToDateTime(fIni);
                //DateTime fechaFin = Convert.ToDateTime(fFin);

                var result = await ventaServices.GetReporteVentas(fechaInicio, fechaFin, producto);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("ReportePago/{fIni}/{fFin}/{producto}")]
        public async Task<JsonResult> GetReportePagos(string fIni, string fFin, int producto)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(fIni);
                DateTime fechaFin = Convert.ToDateTime(fFin);

                var result = await ventaServices.GetReportePagos(fechaInicio, fechaFin, producto);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }


        // GET: api/Venta
        [HttpGet("CapitalEfectivo/{fIni}/{fFin}")]
        public async Task<JsonResult> CapitalEfectivo(string fIni, string fFin)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(fIni);
                DateTime fechaFin = Convert.ToDateTime(fFin);

                var result = new { Valor = 1000 };
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        // GET: api/Venta
        [HttpGet("ReporteCierreDiario/{fIni}/{cSector}")]
        public async Task<JsonResult> GetReporteCierreDiario(string fIni, int cSector)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(fIni);
                var result = await ventaServices.GetReporteCierreDiario(fechaInicio, cSector);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        // GET: api/Venta
        [HttpGet("ReporteCierreDiarioCabecera")]
        public async Task<JsonResult> GetReporteCierreDiarioCabecera()
        {
            try
            {
                var result = await ventaServices.GetReporteCierreDiarioCabecera();
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("{IdCliente}",Name = "ListaVentasByCliente")]
        public async Task<JsonResult> GetVentasByCliente(int IdCliente)
        {
            try
            {
                var result = await ventaServices.GetVentasByCliente(IdCliente);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }  
        }
        [HttpGet("anulados/{IdCliente}", Name = "ListaVentasAnuladasByCliente")]
        public async Task<JsonResult> GetVentasAnuladasByCliente(int IdCliente)
        {
            try
            {
                var result = await ventaServices.GetVentasAnuladasByCliente(IdCliente);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("Reserva/{IdCliente}")]
        public async Task<JsonResult> GetReservasByCliente(int IdCliente)
        {
            try
            {
                var result = await ventaServices.GetReservasByCliente(IdCliente);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("pago/{IdCliente}")]
        public async Task<JsonResult> GetPagosByCliente(int IdCliente)
        {
            try
            {
                var result = await ventaServices.GetPagosByCliente(IdCliente);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet("{idClient}/{idProd}")]
        public async Task<JsonResult> GetDeudaAnterior(int idProd, int idClient)
        {
            string result = await ventaServices.GetVentaDeudaAnterior(idClient,idProd);
            return Json(result);
        }

        [HttpGet("DeudaTotal/{idClient}")]
        public async Task<JsonResult> GetDeudaTotal(int idClient)
        {
            int result = await ventaServices.GetVentaDeudaTotalByCliente(idClient);
            return Json(result);
        }

        // POST: api/Venta
        [HttpPost]
        [Route("IngresarVenta")]
        public async Task<JsonResult> PostIngresoVenta([FromBody]  VentaEntity venta)
        {
            try
            {
                if (venta != null) { 
                await ventaServices.InsertVenta(venta);                
               return Json (0);
                }
                else
                {
                    return Json("Venta no tiene datos.");
                }
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpPost]
        [Route("IngresarVentaAnulada")]
        public async Task<JsonResult> PostIngresoVentaAnulada([FromBody] VentaEntity venta)
        {
            try
            {
                if (venta != null)
                {
                    await ventaServices.InsertVentaAnulada(venta);
                    return Json(0);
                }
                else
                {
                    return Json("Venta no tiene datos.");
                }
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpPost]
        [Route("UpdateVenta")]
        public async Task<JsonResult> PostUpdateVenta([FromBody] VentaEntity venta)
        {
            try
            {
                if (venta != null)
                {
                    await ventaServices.UpdateVenta(venta);
                    return Json(0);
                }
                else
                {
                    return Json("Venta no tiene datos.");
                }
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpPost]
        [Route("RegistrarReserva")]
        public async Task<JsonResult> PostRegistrarReserva([FromBody]List<VentaEntity> venta)
        {
            try
            {
                if (venta != null)
                {
                    await ventaServices.RegistrarReserva(venta);
                    return Json(0);
                }
                else
                {
                    return Json("Venta no tiene datos.");
                }
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpPost]
        [Route("ConfirmarReserva/{reservaid}")]
        public async Task<JsonResult> PostConfirmarReserva([FromBody]VentaEntity venta, int reservaid)
        {
            try
            {
                if (venta != null)
                {
                    await ventaServices.InsertVenta(venta);
                    return Json(0);
                }
                else
                {
                    return Json("Venta no tiene datos.");
                }
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("EliminaVenta/{ventaId}")]
        public async Task<JsonResult> PostEliminaVenta(int ventaId)
        {
            try
            {
                await ventaServices.EliminaVenta(ventaId);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("DeleteVentaAll/{ventaId}")]
        public async Task<JsonResult> DeleteVentaAll(int ventaId)
        {
            try
            {
                await ventaServices.EliminaVentaAll(ventaId);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        // PUT: api/Venta/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("Venta_GetByClienteFecha/{fechaInicio}/{fechaFin}/{clienteid}")]
        public async Task<JsonResult> Venta_GetByClienteFecha(string fechaInicio, string fechaFin, int clienteid)
        {
            try
            {
                //DateTime fechaInicio = Convert.ToDateTime(fIni);
                //DateTime fechaFin = Convert.ToDateTime(fFin);

                var result = await ventaServices.Venta_GetByClienteFecha(fechaInicio, fechaFin, clienteid);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
    }
}
