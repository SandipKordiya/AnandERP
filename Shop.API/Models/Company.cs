using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Heading { get; set; }
        public string Address { get; set; }
        public int? StateId { get; set; }
        public int? CityId { get; set; }
        public string Mobile { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string ContactPerson { get; set; }
        public string Designation { get; set; }
        public string AddressLabel { get; set; }
        public string GSTIN { get; set; }
        public string CINO { get; set; }
        public string PANNO { get; set; }
        public bool IsActive { get; set; }
        public string LoginURL { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
        public int BranchId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }
        
        [ForeignKey("StateId")]
        public State State { get; set; }

        [ForeignKey("CityId")]
        public City City { get; set; }
    }
}