using Distribucion.Interfaces;
using Distribucion.Repositorio;
using Distribucion.Repositorio.DapperHelper;
using Distribucion.Servicios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using System;
using Distribucion.Interfaces.Services;
using Distribucion.Interfaces.Repositories;

namespace Distribucion.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                   // builder => builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
               builder => builder.WithOrigins("http://localhost:24222").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            });

            services.AddMvc();

            services.AddMvc().AddJsonOptions(options => { options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                        options.TokenValidationParameters = new TokenValidationParameters {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = Configuration["Issuer"],
                            ValidAudience = Configuration["Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Supplier_SymmetricKey"])),
                            ClockSkew = TimeSpan.Zero
                        }
                     );


            services.AddTransient<IDapperHelper, DapperHelper>();
            services.AddTransient<IOperacionServices, OperacionServices>();
            services.AddTransient<IOperacionRepository, OperacionRepository>();
            services.AddTransient<IClienteServices, ClienteServices>();
            services.AddTransient<IClienteRepository, ClienteRepository>();
            services.AddTransient<IProductoServices, ProductoServices>();
            services.AddTransient<IProductoRepository, ProductoRepository>();
            services.AddTransient<IClienteServices_nt, ClienteServices_nt>();
            services.AddTransient<IClienteRepository_nt, ClienteRepository_nt>();
            services.AddTransient<IGastoRepository, GastoRepository>();
            services.AddTransient<IGastoServices, GastoServices>();
            services.AddTransient<IProveedorServices, ProveedorServices>();
            services.AddTransient<IProveedorRepository, ProveedorRepository>();
            services.AddTransient<ISectorServices, SectorServices>();
            services.AddTransient<ISectorRepository, SectorRepository>();
            services.AddTransient<IVentaServices, VentaServices>();
            services.AddTransient<IVentaRepository, VentaRepository>();
            services.AddTransient<IStockServices, StockServices>();
            services.AddTransient<IStockRepository, StockRepository>();
            services.AddTransient<IUsuarioServices, UsuarioServices>();
            services.AddTransient<IUsuarioRepository, UsuarioRepository>();
            services.AddTransient<ICompraRepository, CompraRepository>();
            services.AddTransient<ICompraServices, CompraServices>();
            services.AddTransient<ICompraDetalleRepository, CompraDetalleRepository>();
            services.AddTransient<ICompraDetalleServices, CompraDetalleServices>();

            services.AddTransient<IUnidadMedidaRepository, unidadmedidaRepository>();
            services.AddTransient<IUnidadMedidaServices, UnidadMedidaService>();

            services.AddTransient<ICiudadRepository, CiudadRepository>();
            services.AddTransient<ICiudadServices, CiudadService>();

            services.AddTransient<IModuloRepository, ModuloRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("Distribucion API");
            //});
            app.UseAuthentication();

            app.UseCors("AllowSpecificOrigin");
            app.UseMvc();

        }
    }
}
