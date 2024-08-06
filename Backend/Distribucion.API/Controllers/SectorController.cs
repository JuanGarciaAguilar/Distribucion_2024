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
    [Route("api/Sector")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SectorController : Controller
    {
        private readonly ISectorServices sectorServices;

        public SectorController(ISectorServices sectorServices)
        {
            this.sectorServices = sectorServices;
        }
        
        // GET: api/Sector
        [HttpGet]
        public async Task<JsonResult> GetSectoresAll()
        {
            var result = await sectorServices.GetSectorAll();
            return Json(result);
        }

        // GET: api/Sector/5
        [HttpGet("{id}", Name = "GetSectorById")]
        public string GetSectorById(int id)
        {
            return "value";
        }

        // POST: api/Sector
        [HttpPost]
        [Route("InsertSector")]
        public async Task<JsonResult> InserSector([FromBody] SectorEntity sector)
        {
            try
            {
                await sectorServices.Insert(sector);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }

        // PUT: api/Sector/5
        // [HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        // {
        // }

        [HttpPost]
        [Route("UpdateSector")]
        public async Task<JsonResult> PostUpdateSector([FromBody] SectorEntity sector)
        {
            try
            {
                await sectorServices.Update(sector);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        // DELETE: api/ApiWithActions/5
        /// [HttpDelete("{id}")]
        // public void Delete(int id)
        // {
        // }

        [HttpDelete]
        [Route("DeleteSector/{IdSector}")]
        public async Task<JsonResult> PostDeleteSector(int IdSector)
        {
            try
            {
                await sectorServices.Delete(IdSector);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
    }
}
