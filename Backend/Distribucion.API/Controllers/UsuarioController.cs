using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Distribucion.Entidades;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Distribucion.Interfaces;

namespace Distribucion.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Usuario")]
    
    public class UsuarioController : Controller
    {

        private readonly IUsuarioServices usuarioServices;
        IConfiguration configuration;

        public UsuarioController(IUsuarioServices usuarioServices, IConfiguration configuration)
        {
            this.usuarioServices = usuarioServices;
            this.configuration = configuration;
        }
        
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            try
            {
                var list = await usuarioServices.GetAll();
                return Json(list);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }
        [HttpPost]
        [Route("InsertUsuario")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<JsonResult> PostInsertUsuario([FromBody]UsuarioEntity usuario)
        {
            try
            {
                await usuarioServices.InsertUsuario(usuario);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpPost]
        [Route("UpdateUsuario")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<JsonResult> PostUpdateUsuario([FromBody]UsuarioEntity usuario)
        {
            try
            {
                await usuarioServices.UpdateUsuario(usuario);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }
        [HttpGet]
        [Route("DeleteUsuario/{IDUsuario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<JsonResult> PostDeleteUsuario(string IDUsuario)
        {
            try
            {
                await usuarioServices.DeleteUsuario(IDUsuario);
                return Json(0);
            }
            catch (Exception e)
            {
                return Json(e);
            }
        }

        [AllowAnonymous]
        [HttpPost("Login")]
       // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async  Task<IActionResult> PostLogin([FromBody]UsuarioEntity usuario)
        {
            try
            {
                UsuarioEntity user = await usuarioServices.Login(usuario);
                if (user == null)

                {
                    return Unauthorized();
                }
                else
                {
                    return BuildToken(user);
                }

                //return Unauthorized();
                //var tokenHandler = new JwtSecurityTokenHandler();
                //var key = generarKey(usuario.Email);
                //var tokenDescriptor = new SecurityTokenDescriptor
                //{
                //    Subject = new ClaimsIdentity(new Claim[]
                //    {
                //    new Claim(ClaimTypes.Email, u.UserID)
                //    }),
                //    Expires = DateTime.UtcNow.AddDays(7),
                //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
                //};
                //var token = tokenHandler.CreateToken(tokenDescriptor);
                //var tokenString = tokenHandler.WriteToken(token);
                //return Ok(new
                //{
                //    user = u,
                //    token = tokenString
                //});
            }
            catch (Exception e)
            {
                return Json(e);
            }
           
        }
        private IActionResult BuildToken(UsuarioEntity user)
        {
            try
            {

                Claim[] claims = new[] {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.FullName),
                //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                //new Claim(JwtRegisteredClaimNames.NameId, user.UserID),
                new Claim("UserId",user.UserID.ToString()),
                new Claim("UserFullName",user.FullName)
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");                
                string configurationKey = "Supplier_SymmetricKey";
                
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration[configurationKey]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expiring = DateTime.UtcNow.AddHours(3);

                JwtSecurityToken token = new JwtSecurityToken(
                    issuer: configuration["Issuer"],
                    audience: configuration["Audience"],
                    claims: claimsIdentity.Claims,
                    expires: expiring,
                    signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = expiring,
                    user = user
                });
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}