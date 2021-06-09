using System;

namespace Shop.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string  Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
    }
}