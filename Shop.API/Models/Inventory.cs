using System;

namespace Shop.API.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int BranchId { get; set; }
        public double Stock { get; set; }
        public DateTime Created { get; set; }
        public Product Product { get; set; }
        public Branch Branch { get; set; }
    }
}