using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using DinkToPdf;
using DinkToPdf.Contracts;
using Shop.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http.Features;
using Shop.API.Extensions;
using Shop.API.Helpers;
using Microsoft.AspNetCore.Identity;
using Shop.API.Models;
using System.IO;
using Shop.API.Middleware;

namespace Shop.API
{
    public class Startup
    {
        private readonly IWebHostEnvironment _host;
        private readonly IConfiguration _config;
        public Startup(IConfiguration config, IWebHostEnvironment host)
        {
            _config = config;
            _host = host;
        }

        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => x.UseSqlServer(_config.GetConnectionString("DefaultConnection")));


            var context = new CustomAssemblyLoadContext(); 
            context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), "libwkhtmltox.dll"));
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
       
            services.AddApplicationServices(_config, _host);
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            ); ;

            services.AddCors(options =>
            {
                options.AddPolicy(
                  "CorsPolicy",
                  builder => builder.WithOrigins("http://localhost:4200", "http://ayurveda.jas-associates.com")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
            });

            services.AddIdentityServices(_config);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

             app.UseMiddleware<ExceptionMiddleware>();
             
            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            // }
            // else
            // {
            //     app.UseExceptionHandler(builder =>
            //     {
            //         builder.Run(async context =>
            //         {
            //             context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            //             var error = context.Features.Get<IExceptionHandlerFeature>();
            //             if (error != null)
            //             {
            //                 context.Response.AddApplicationError(error.Error.Message);
            //                 await context.Response.WriteAsync(error.Error.Message);
            //             }
            //         });
            //     });
            // }

            app.UseCorsMiddleware();
            // app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            //app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //  endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
