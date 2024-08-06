using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Distribucion.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Distribucion.Entidades;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Operacion")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OperacionController : Controller
    {
        private readonly IOperacionServices operacionServices;

        public OperacionController(IOperacionServices operacionServices)
        {
            this.operacionServices = operacionServices;
        }

        // GET: api/Operacion
        [HttpGet("{cliente}/{ini}/{fin}")]
        public async Task<JsonResult> GetOperacionesByCliente(int cliente, string ini, string fin)
        {
            DateTime fechaInicio = Convert.ToDateTime(ini);
            DateTime fechaFin = Convert.ToDateTime(fin);
            var result = await operacionServices.GetAllOperaciones(cliente, fechaInicio, fechaFin);            
            return Json(result);
        }

        // GET: api/Operacion
        [HttpGet("{sector}/{date}")]
        public async Task<JsonResult> GetOperacionesByDia(int sector, string date)
        {
            DateTime dateFind = Convert.ToDateTime(date);
            int c = 0;
            var result = await operacionServices.GetOperacionesByDia(sector, dateFind);
            int totalUnidades = 0;
            double totalPeso = 0;
            double totalPrecioTotal = 0;
            double totalDeudaAnterior = 0;           
            double totalSaldoAcumulado = 0;
            double totalMontoPagado = 0;
            double totalDeudaAcumulada = 0;
            double promedioPrecioPorKilo = 0;
            foreach (var a in result)
            {
                totalUnidades = totalUnidades + a.Unidades;
                totalPeso = totalPeso + a.PesoTotal;
                totalPrecioTotal = totalPrecioTotal + a.PrecioTotal;
                totalDeudaAnterior = totalDeudaAnterior + a.DeudaAnterior;
                totalSaldoAcumulado = totalSaldoAcumulado + a.SaldoAcumulado;
                totalMontoPagado = totalMontoPagado + a.MontoPagado;
                totalDeudaAcumulada = totalDeudaAcumulada + a.DeudaAcumulada;
                promedioPrecioPorKilo = promedioPrecioPorKilo + a.PrecioPorKilo;
                c++;
            }
            OperacionDiariaEntity total = new OperacionDiariaEntity();
            total.NombreCliente = "TOTAL";
            total.Unidades = totalUnidades;
            total.PesoTotal = totalPeso;
            total.PrecioTotal = totalPrecioTotal;
            total.DeudaAnterior = totalDeudaAnterior;
            total.SaldoAcumulado = totalSaldoAcumulado;
            total.MontoPagado = totalMontoPagado;            
            total.DeudaAcumulada = totalDeudaAcumulada;
            total.PrecioPorKilo = totalPrecioTotal / totalPeso;
            result.Add(total);
            return Json(result);
        }

        // GET: api/Operacion/5
        [HttpGet("{id}", Name = "GetOp")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Operacion
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Operacion/5
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
