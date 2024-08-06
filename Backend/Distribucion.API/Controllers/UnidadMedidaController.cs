using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Distribucion.Interfaces.Services;
using System;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/UnidadMedida")]
  //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UnidadMedidaController : Controller
    {
        private readonly IUnidadMedidaServices UnidadMedidaServices;

        public UnidadMedidaController(IUnidadMedidaServices UnidadMedidaServices)
        {
            this.UnidadMedidaServices = UnidadMedidaServices;
        }

        // GET: api/Sector
        [HttpGet]
        public async Task<JsonResult> GetUnidadMedidaAll()
        {
            var result = await UnidadMedidaServices.GetUnidadMedidaAll();
            return Json(result);
        }

        [HttpPost]
        [Route("InsertUnidadMedida")]
        public async Task<JsonResult> InserUnidadMedida([FromBody] UnidadMedidaEntity unidadmedida)
        {
            try
            {
                await UnidadMedidaServices.Insert(unidadmedida);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }

        [HttpPost]
        [Route("UpdateUnidadMedida")]
        public async Task<JsonResult> PostUpdateUnidadMedida([FromBody] UnidadMedidaEntity UnidadMedida)
        {
            try
            {
                await UnidadMedidaServices.Update(UnidadMedida);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpDelete]
        [Route("DeleteUnidadMedida/{IdUnidadMedida}")]
        public async Task<JsonResult> PostDeleteUnidadMedida(int IdUnidadMedida)
        {
            try
            {
                await UnidadMedidaServices.Delete(IdUnidadMedida);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

    }
}
