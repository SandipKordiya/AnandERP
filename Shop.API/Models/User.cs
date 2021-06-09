using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Shop.API.Models
{
      public class User : IdentityUser<int>
    {
        public string Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CompanyId { get; set; }
        public string MobileNumber { get; set; }
        public DateTime Created { get; set; }
        public int BranchId { get; set; }
        public DateTime LastActive { get; set; }
        public Branch Branch { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}