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
    [Route("api/Producto")]
   // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductoController : Controller
    {
        private readonly IProductoServices productoServices;
        public ProductoController(IProductoServices productoServices)
        {
            this.productoServices = productoServices;
        }
        [HttpGet]
        public async Task<JsonResult> Get() {
            try
            {
                var list = await productoServices.GetAllProductos();
                return Json(list);
            }
            catch (Exception e)
            {
                return Json (e.Message);
            }           
        }

        [HttpGet("Padre")]
        public async Task<JsonResult> GetProductosPadre()
        {
            try
            {
                var list = await productoServices.GetProductosPadre();
                return Json(list);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        [HttpGet("ReporteGanancia/{ini}/{fin}")]
        public async Task<JsonResult> GetReporteGanancia (string ini, string fin)
        {
            try
            {
                DateTime fechaInicio = Convert.ToDateTime(ini);
                DateTime fechaFin = Convert.ToDateTime(fin);
                var dataReporte = await productoServices.GetReporteGanacia(fechaInicio, fechaFin);
                return Json(dataReporte);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        [HttpPost]
        [Route("InsertCategoria")]
        public async Task<JsonResult> PostInsertCategoria([FromBody] ProductoEntity producto)
        {
            try
            {
                await productoServices.InsertCategoria(producto);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }
        [HttpPost]
        [Route("InsertProducto")]
        public async Task<JsonResult> PostInsertProducto([FromBody] ProductoEntity producto)
        {
            try
            {
                await productoServices.InsertProducto(producto);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }

        }
        [HttpPost]
        [Route("UpdateCategoria")]
        public async Task<JsonResult> PostUpdateCategoria([FromBody] ProductoEntity producto)
        {
            try
            {
                await productoServices.UpdateCategoria(producto);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpPost]
        [Route("UpdateProducto")]
        public async Task<JsonResult> PostUpdateProducto([FromBody] ProductoEntity producto)
        {
            try
            {
                await productoServices.UpdateProducto(producto);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("DeleteProducto/{IdProducto}")]
        public async Task<JsonResult> EliminaProducto(int IdProducto)
        {
            try
            {
                await productoServices.EliminaProducto(IdProducto);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [HttpGet]
        [Route("DeleteCategoria/{IdProducto}")]
        public async Task<JsonResult> PostDeleteCategoria(int IdProducto)
        {
            try
            {
                await productoServices.EliminarCategoria(IdProducto);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpGet]
        [Route("Equivalencia")]
        public async Task<JsonResult> GetListaEquivalencia()
        {
            try
            {
                var list = await productoServices.GetListaEquivalencia();
                return Json(list);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpGet]
        [Route("DeleteEquivalencia/{IdEquivalencia}")]
        public async Task<JsonResult> PostDeleteEquivalencia(int IdEquivalencia)
        {
            try
            {
                await productoServices.EliminarEquivalencia(IdEquivalencia);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
    }
}