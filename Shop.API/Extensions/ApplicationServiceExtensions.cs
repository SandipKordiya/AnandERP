using System;
using System.IO;
using System.Linq;
using AutoMapper;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shop.API.Data;
using Shop.API.Errors;
using Shop.API.Helpers;
using Shop.API.Interfaces;
using Shop.API.Repositories;
using Shop.API.Services;

namespace Shop.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config, IWebHostEnvironment host)
        {
            services.AddScoped<Interfaces.ITokenService, Services.TokenService>();
            services.AddScoped<ILedgerService, LedgerService>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<TemplateGenerator>();


            // services.AddDbContext<DataContext>(x =>
            //     x.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IShopRepository, ShopRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ILedgerRepository, LedgerRepository>();
            services.AddScoped<ISaleRepository, SaleRepository>();

            services.AddScoped<GSTINValidator>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<CurrencyInWords>();

            services.Configure<ApiBehaviorOptions>(options =>
           {
               options.InvalidModelStateResponseFactory = actionContext =>
               {
                   var errors = actionContext.ModelState
                       .Where(e => e.Value.Errors.Count > 0)
                       .SelectMany(x => x.Value.Errors)
                       .Select(x => x.ErrorMessage).ToArray();

                   var errorResponse = new ApiValidationErrorResponse
                   {
                       Errors = errors
                   };

                   return new BadRequestObjectResult(errorResponse);
               };
           });

            return services;
        }
    }
}