using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Home")]
    public class HomeController : Controller
    {
        // GET: api/Home
        [HttpGet]
        public string Get()
        {
            string ok = "API funcionando correctamente.";
            return ok;
        }
    }
}
