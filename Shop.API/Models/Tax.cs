using System;

namespace Shop.API.Models
{
    public class Tax
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Rate { get; set; }
        public DateTime Created { get; set; }
        public bool IsActive { get; set; }
    }
}