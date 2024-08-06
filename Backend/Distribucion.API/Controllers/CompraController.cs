using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Compra")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CompraController : Controller
    {
        private readonly ICompraServices compraServices;

        public CompraController(ICompraServices compraServices)
        {
            this.compraServices = compraServices;
        }
        
        // GET: api/Compra
        [HttpGet]
        public async Task<JsonResult> GetCompraAll()
        {
            try
            {
                var result = await compraServices.GetCompraAll();
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("Compra/{id}")]
        public async Task<JsonResult> GetCompraById(int id)
        {
            var result = await compraServices.GetCompraById(id);
            return Json(result);
        }

        //GET: api/Compra/reporte
        [HttpGet]
       [Route("reporte/{fIni}/{fFin}/{nProveedor}")]
        public async Task<JsonResult> GetCompraReporte(string fIni, string fFin, string nProveedor)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(fIni);
                DateTime fechaFin = Convert.ToDateTime(fFin);
                var result = await compraServices.GetCompraReporte(fechaInicio, fechaFin, nProveedor);
                return Json(result);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        // GET: api/Compra
        [HttpGet("saldo/{idProd}/{idProv}")]
        public async Task<JsonResult> GetSaldoActual(int idProd, int idProv)
        {
            int result = await compraServices.GetCompraSaldoAnterior2(idProd, idProv);
            return Json(result);
        }


        // GET: api/Compra/5
       // [HttpGet("{id}", Name = "GetCompraById")]
       // public async Task<JsonResult> GetCompraById(int id)
       // {
       //    var result = await compraServices.GetCompraById(id);
       //    return Json(result);
       // }
    
      

        // POST: api/Compra
        [HttpPost]
        [Route("insert")]
        public async Task<JsonResult> PostCompraSemanal([FromBody]CompraEntity Compra)
        {
            try
            {
                await compraServices.CompraInsert(Compra);
                var result = 0;
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        // PUT: api/Compra/update
        [HttpPost]
        [Route("confirmar")]
        public async Task<JsonResult> ConfirmarCompraSemanal([FromBody]CompraEntity Compra)
        {
            try
            {
                await compraServices.ConfirmarCompra(Compra);
                var result = 0;
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpPost]
        [Route("update")]
        public async Task<JsonResult> UpdateCompraSemanal([FromBody]CompraEntity Compra)
        {
            try
            {
                await compraServices.UpdateCompra(Compra);
                var result = 0;
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpPost]
        [Route("updateFechas")]
        public async Task<JsonResult> UpdateFechas([FromBody] CompraEntity Compra)
        {
            try
            {
                await compraServices.UpdateFechas(Compra);
                var result = 0;
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        // DELETE w.GET: api/Compra/delete/id
        [HttpGet][Route("delete/{id}")]
        public async Task DeleteCompraSemanalGet(int id)
        {
            await compraServices.DeleteCompra(id);
        }

        [HttpGet]
        [Route("deletepc/{cdid}")]
        public async Task DeleteProductoCompra(int cdid)
        {
            await compraServices.DeleteProductoCompra(cdid);
        }


    }
}
