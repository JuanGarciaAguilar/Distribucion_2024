using Distribucion.Interfaces.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Modulo")]
    public class ModuloController : Controller
    {
        private readonly IModuloRepository _Modulo;

        public ModuloController(IModuloRepository Modulo)
        {
            _Modulo = Modulo;
        }
   
        [HttpGet("GetModulo")] 
        public async Task<IActionResult> GetModulo(string cPersCod)
        {
            try
            {
                cPersCod = "prueba@gmail.com";
                var List = await _Modulo.GetModulo(cPersCod);

                return Json(List);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
    }
}
