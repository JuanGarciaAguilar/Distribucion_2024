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
    [Route("api/CompraDetalle")]
   // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CompraDetalleController : Controller
    {
        private readonly ICompraDetalleServices detalleServices;

        public CompraDetalleController(ICompraDetalleServices detalleServices)
        {
            this.detalleServices = detalleServices;
        }

        [HttpGet]
        [Route("Detalle/{id}")]
        public async Task<JsonResult> GetCompraById(int id)
        {
            var result = await detalleServices.GetCompraById(id);
            return Json(result);
        }

        [HttpGet]
        [Route("DetalleMax/{id}/{unidadmedida}")]
        public async Task<JsonResult> distribucion_Compra_GetMax(int id,string unidadmedida)
        {
            try
            {
                var result = await detalleServices.distribucion_Compra_GetMax(id, unidadmedida);
                return Json(result);
            }
            catch (Exception error)
            {

                return Json(error.Message);
            }
            
        }


        [HttpPost]
        [Route("update")]
        public async Task<JsonResult> UpdateDatalleCompra([FromBody] CompraDetalleEntity CompraDetalle)
        {
            try
            {
                
                await detalleServices.UpdateDetalleCompra(CompraDetalle);
                var result = 0;
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpPost]
        [Route("InsertDetalle")]
        public async Task<JsonResult> Insert([FromBody] CompraDetalleEntity compradetalle)
        {
            try
            {
                await detalleServices.InsertDetalleCompra(compradetalle);
                return Json(0);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }
        [HttpDelete]
        [Route("DeleteDetalle/{detalleID}")]
        public async Task<JsonResult> PostDeleteDetalle(int detalleId)
        {
            try
            {
                await detalleServices.DeleteDetalleCompra(detalleId);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpPost]
        [Route("InsertCostos")]
        public async Task<JsonResult> InsertCostos([FromBody] CostoEntity costos)
        {
            try
            {
                await detalleServices.InsertCostos(costos);
                return Json(0);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }

        }

    }
}
