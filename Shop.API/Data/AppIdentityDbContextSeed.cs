using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Shop.API.Models;

namespace Shop.API.Data
{
    public class AppIdentityDbContextSeed
    {
         public static async Task SeedUsersAsync(UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    FirstName = "Sam",
                    LastName = "Parmar",
                    Created = DateTime.Now,
                    Email = "admin@gmail.com",
                    UserName = "Sam",
                    BranchId = 1
                };
                var result = await userManager.CreateAsync(user, "Pa$$w0rd");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}