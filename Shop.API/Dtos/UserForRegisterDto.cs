using System;
using System.ComponentModel.DataAnnotations;

namespace Shop.API.Dtos
{
    public class UserForRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "you must specify password between 4 and 8 characters.")]
        public string Password { get; set; }
        public string MobileNumber { get; set; }
        public int BranchId { get; set; }
    }
}