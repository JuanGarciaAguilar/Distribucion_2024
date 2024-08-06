using Distribucion.Entidades;
using Distribucion.Interfaces.Services;
using Distribucion.Servicios;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Ciudad")]
    public class CiudadController : Controller
    {

        private readonly ICiudadServices CiudadServices;
        public CiudadController(ICiudadServices CiudadServices)
        {
            this.CiudadServices = CiudadServices;
        }


        [HttpGet]
        [Route("NewCiudades")]
        public async Task<JsonResult> GetNewCiudades()
        {
            var result = await CiudadServices.GetNewCiudades();
            return Json(result);
        }
        
        [HttpPost]
        [Route("InsertCiudad")]
        public async Task<JsonResult> InsertCiudad([FromBody] CiudadEntity Entity)
        {
            try
            {
                await CiudadServices.InsertCiudad(Entity);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }

        [HttpPost]
        [Route("UpdateCiudad")]
        public async Task<JsonResult> UpdateCiudad([FromBody] CiudadEntity Entity)
        {
            try
            {
                await CiudadServices.UpdateCiudad(Entity);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }
    }
}
