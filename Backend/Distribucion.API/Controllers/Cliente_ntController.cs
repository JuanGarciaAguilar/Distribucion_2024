using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Servicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Cliente_nt")]
    public class ClienteServices_ntController : Controller
    {
        private readonly IClienteServices_nt ClienteServices_nt;
        public ClienteServices_ntController(IClienteServices_nt ClienteServices_nt)
        {
            this.ClienteServices_nt = ClienteServices_nt;
        }

        [HttpGet]
        [Route("listaCliente")]
        public async Task<JsonResult> GetListaClientes() {
            try
            {
                var list = await ClienteServices_nt.GetAllCliente_ntAsync();
                return Json(list);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }
        [HttpGet]
        [Route("clientesBySector/{sectorid}")]
        public async Task<JsonResult> GetListaClientesBySector(int sectorid)
        {
            try
            {
                var list = await ClienteServices_nt.GetAllClienteBySector(sectorid);
                return Json(list);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        [HttpGet]
        [Route("deudaClientesBySector")]
        public async Task<JsonResult> GetDeudaClientesBySector()
        {
            try
            {
                var list = await ClienteServices_nt.GetDeudaClientesBySector();
                return Json(list);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }


    }
}