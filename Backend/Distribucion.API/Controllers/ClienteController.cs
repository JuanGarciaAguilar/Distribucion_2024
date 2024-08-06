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
    [Route("api/Cliente")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ClienteController : Controller
    {
        private readonly IClienteServices clienteServices;

        public ClienteController(IClienteServices clienteServices)
        {
            this.clienteServices = clienteServices;
        }
        
        // GET: api/Cliente  (Proyecto Antiguo)
        [Route("sec/{sector}")]
        [HttpGet("{sector}")]
        public async Task<JsonResult> GetCliente(int sector)
        {
            var result2 = await clienteServices.GetCliente(sector);
            return Json(result2);
        }

        // GET: api/Cliente  (Proyecto Nuevo)
        [Route("sector/{sector}")]
        [HttpGet("{sector}")]
        public async Task<JsonResult> GetClienteBySector(int sector)
        {
            var result = await clienteServices.GetClienteBySector(sector);
            return Json(result);
        }

        // GET: api/Cliente/5
        [HttpGet("{id}")]
        public async Task<JsonResult> GetClienteById(int id)
        {
            var result = await clienteServices.GetClienteById(id);
            return Json(result);
        }
        
        // POST: api/Cliente
        [HttpPost]
        [Route("InsertarCliente")]
        public async Task<JsonResult> PostInsertCliente([FromBody] ClienteEntity_nt cliente/*,[FromQuery] int id*/)
        {
            try
            {
                await clienteServices.InsertCliente(cliente);
                return Json(0);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
            
        }
        
        // PUT: api/Cliente/5
        [HttpPost]
        [Route("UpdateCliente")]
        public async Task<JsonResult> PostUpdateCliente([FromBody]ClienteEntity_nt cliente)
        {
            try
            {
                await clienteServices.UpdateCliente(cliente);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
           
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        [HttpGet]
        [Route("PagarDeuda/{ClienteId}/{DeudaActualizada}/{Observacion}/{user}/{FechaPago}")]
        public async Task<JsonResult> GetPagarDeuda(int ClienteId, decimal DeudaActualizada, string Observacion, string user, DateTime FechaPago)
        {
            try
            {
                await clienteServices.PagarDeuda(ClienteId, DeudaActualizada, Observacion, user, FechaPago);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpGet]
        [Route("PagarDeuda/{ventaId}/{ClienteId}/{DeudaActualizada}/{Observacion}/{user}")]
        public async Task<JsonResult> GetActualizarPago(int ventaId,int ClienteId, decimal DeudaActualizada, string Observacion, string user)
        {
            try
            {
                await clienteServices.ActualizarPago(ventaId,ClienteId, DeudaActualizada, Observacion, user);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpGet]
        [Route("DeudaByCliente/{idCliente}")]
        public async Task<JsonResult> GetDeudaByClient(int idCliente)
        {
            try
            {
                string deuda = await clienteServices.DeudaByClient(idCliente);
                return Json(deuda);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
    }
}
