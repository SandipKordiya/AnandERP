using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public string Address { get; set; }
        public int? CityId { get; set; }
        public int? StateId { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public ICollection<User> Users { get; set; }

        [ForeignKey("StateId")]
        public State State { get; set; }

        [ForeignKey("CityId")]
        public City City { get; set; }
    }
}