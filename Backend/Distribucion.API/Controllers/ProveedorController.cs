using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Servicios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Proveedor")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProveedorController : Controller
    {
        private readonly IProveedorServices proveedorServices;

        public ProveedorController(IProveedorServices proveedorServices)
        {
            this.proveedorServices = proveedorServices;
        }
        
        // GET: api/Proveedor
        [HttpGet]
        public async Task<JsonResult> GetProveedorAll()
        {
            var result = await proveedorServices.GetProveedorAll();
            return Json(result);
        }
        [HttpGet]
        [Route("ProveedorCiudad")]
        public async Task<JsonResult> GetProveedorAllCuidad()
        {
            var result = await proveedorServices.GetProveedorAllCiudad();
            return Json(result);
        }

        [HttpGet]
        [Route("Ciudades")]
        public async Task<JsonResult> Getciudaes()
        {
            var result = await proveedorServices.GetCiudades();
            return Json(result);
        }


        [HttpGet]
        [Route("ProveedorCiudadAll")]
        public async Task<JsonResult> GetProveedorCiudadALL()
        {
            var result = await proveedorServices.GetProveedorCiudadAll();
            return Json(result);
        }

        // GET: api/Proveedor/5
        [HttpGet("{id}", Name = "GetProveedorById")]
        public string GetProveedorById(int id)
        {
            return "value";
        }

        // POST: api/Proveedor
        [HttpPost]
        [Route("InsertProveedor")]
        public async Task<JsonResult> PostInsertProveedor([FromBody] ProveedorEntity enntity)
        {
            try
            {
                await proveedorServices.Insert(enntity);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }

        [HttpPost]
        [Route("UpdateProveedor")]
        public async Task<JsonResult> PostUpdateProducto([FromBody] ProveedorEntity enntity)
        {
            try
            {
                await proveedorServices.Update(enntity);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }

        // DELETE: api/ApiWithActions/5
        [HttpGet("DeleteProveedor/{id}")]
        public async Task<JsonResult> DeleteProveedor(int id)
        {
            try
            {
                await proveedorServices.Delete(id);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
    }
}
