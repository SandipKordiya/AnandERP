using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shop.API.Data;
using Shop.API.Models;

namespace Shop.API.Extensions
{
    public static class IdentityServiceExtensions
    {
        // public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        // {
        //     var builder = services.AddIdentityCore<Models.User>();

        //     builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
        //     builder.AddEntityFrameworkStores<DataContext>();
        //     builder.AddRoleValidator<RoleValidator<Role>>();
        //     builder.AddRoleManager<RoleManager<Role>>();
        //     builder.AddSignInManager<SignInManager<User>>();



        //     services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //         .AddJwtBearer(options =>
        //         {
        //             options.TokenValidationParameters = new TokenValidationParameters
        //             {
        //                 ValidateIssuerSigningKey = true,
        //                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
        //                 ValidIssuer = config["Token:Issuer"],
        //                 ValidateIssuer = true,
        //                 ValidateAudience = false
        //             };
        //         });

        //     return services;
        // }

        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
           IConfiguration config)
        {
            services.AddIdentityCore<User>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            })
                .AddRoles<Role>()
                .AddRoleManager<RoleManager<Role>>()
                .AddSignInManager<SignInManager<User>>()
                .AddRoleValidator<RoleValidator<Role>>()
                .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                opt.AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));
            });

            return services;
        }
    }
}