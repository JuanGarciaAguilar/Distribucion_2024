using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Gasto")]
   // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GastoController : Controller
    {
        private readonly IGastoServices gastoServices;

        public GastoController(IGastoServices gastoServices)
        {
            this.gastoServices = gastoServices;
        }

        // GET: api/Gasto
        [HttpGet]
        public async Task<JsonResult> GetGastoAll()
        {
            var result = await gastoServices.GetGastoAll();
            return Json(result);
        }

        // GET: api/Gasto
        [HttpGet]
        [Route("toHoy")]
        public async Task<JsonResult> GetGastoHastaHoy()
        {
            var result = await gastoServices.GetGastoHastaHoy();
            return Json(result);
        }

        [HttpGet]
        [Route("GetGastoFechas/{Finicio}")]
        public async Task<JsonResult> GetGastoHastaHoyFechas(string Finicio)
        {
            var result = await gastoServices.GetGastoHastaHoyFechas(Finicio);
            return Json(result);
        }

        [HttpGet("{ini}/{fin}")]
        public async Task<JsonResult> GetReporteGanancia(string ini, string fin)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(ini);
                DateTime fechaFin = Convert.ToDateTime(fin);
                var dataReporte = await gastoServices.GetGastoDetalleSemanal(ini, fin);
                return Json(dataReporte);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }


        // GET: api/Gasto/5
        [HttpGet("{id}", Name = "GetGastoById")]
        public async Task<JsonResult> GetGastoById(int id)
        {
            var result = await gastoServices.GetGastoById(id);
            return Json(result);
        }
        
        // POST: api/Gasto
        [HttpPost]
        [Route("insert")]
        public async Task<JsonResult> PostGastoSemanal([FromBody]GastoEntity gasto)
        {
            try
            { 
            await gastoServices.GastoSemanalInsert(gasto);
            var result = 0;
            return Json(result);
            }
            catch (Exception ex){
                return Json(ex);
            }
        }
        
        // PUT: api/Gasto/5
        [HttpPost]
        [Route("update")]
        public async Task<JsonResult> UpdateGastoSemanal([FromBody]GastoEntity gasto)
        {
            try
            { 
            await gastoServices.UpdateGastoSemanal(gasto);
            var result = 0;
            return Json(result);
            }
            catch (Exception ex){
                return Json(ex);
            }
        }

        [HttpGet("TotalPeriodo/{ini}/{fin}")]
        public async Task<JsonResult> GetGastoTotalPeriodo(string ini, string fin)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(ini);
                DateTime fechaFin = Convert.ToDateTime(fin);
                var result = await gastoServices.GetGastoTotalPeriodo(fechaInicio, fechaFin);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        // DELETE w.POST: api/Gasto/delete/id
        [HttpPost("delete/{id}")]
        public async Task DeleteGastoSemanal(int id)
        {
            await gastoServices.DeleteGastoSemanal(id);
        }

        // DELETE w.GET: api/Gasto/delete/id
        [HttpGet("delete/{id}")]
        public async Task DeleteGastoSemanalGet(int id)
        {
            await gastoServices.DeleteGastoSemanal(id);
        }

    }
}
