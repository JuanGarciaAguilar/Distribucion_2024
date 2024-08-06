using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Distribucion.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Stock")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StockController : Controller
    {
        private readonly IStockServices stockServices;

        public StockController(IStockServices stockServices)
        {
            this.stockServices = stockServices;
        }
        
        // GET: api/Stock
        [HttpGet]
        [Route("StockAll")]
        public async Task<JsonResult> GetStockAll()
        {
            var result = await stockServices.GetStockAll();
            return Json(result);
        }

        [HttpGet]
        [Route("StockAll-fechas/{fechainicio}")]
        public async Task<JsonResult> GetStockAll(string fechainicio)
        {
            var result = await stockServices.GetStockAllFechas(fechainicio);
            return Json(result);
        }


        // GET: api/Stock
        [HttpGet]
        [Route("amort-deuda")]
        public async Task<JsonResult> GetMoneyAmortizacionDeuda()
        {
            var result = await stockServices.GetStockAmortizacionDeuda();
            return Json(result);
        }

        [HttpGet]
       // [Route("amort-deuda-fechas")]
        [Route("amort-deuda-fechas/{fechainicio}")]
        public async Task<JsonResult> GetMoneyAmortizacionDeudaFechas(string fechainicio)
        {
            var result = await stockServices.GetStockAmortizacionDeudaFechas(fechainicio);
            return Json(result);
        }

        // GET: api/Stock
        [HttpGet]
        [Route("total")]
        public async Task<JsonResult> GetStockCapitalTotal()
        {
            try
            {
                var result = await stockServices.GetStockCapitalTotal();
                return Json(result);
            }
            catch (Exception)
            {
                return Json(0);
            }
           
        }

        // GET: api/Stock/5
        [HttpGet("{id}", Name = "GetStockById")]
        public async Task<JsonResult> GetStockById(int id)
        {
            try
            {
                var result = await stockServices.GetStockById(id);
                return Json(result);
            }
            catch(Exception)
            {
                return Json(0);
            }
        }

        // GET: api/Stock/saldo-deposito
        [HttpGet("saldo-deposito")]
        public async Task<JsonResult> GetReporteSaldoDeposito()
        {
            try
            {
                var result = await stockServices.GetReporteSaldoDeposito();
                return Json(result);
            }
            catch (Exception)
            {
                return Json(0);
            }
        }

        [HttpGet]
        [Route("efectivo/{fechainicio}")]
        public async Task<JsonResult> GetEfectivo(string fechainicio)
        {

            var result = await stockServices.GetEfectivo(fechainicio);
            return Json(result);
        }


        [HttpGet]
        [Route("efectivoAll")]
        public async Task<JsonResult> GetEfectivo()
        {
            var result = await stockServices.GetEfectivoAll();
            return Json(result);
        }

        [HttpGet]
        [Route("estadofinanciero")]
        public async Task<JsonResult> GetEstadoFinanciero()
        {
            var result = await stockServices.GetEstadoFinanciero();
            return Json(result);
        }

        // POST: api/Stock
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Stock/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
