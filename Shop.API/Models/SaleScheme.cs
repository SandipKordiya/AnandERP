using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class SaleScheme
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int ProductId { get; set; }
        public DateTime Created { get; set; }
        public int Quantity { get; set; }
        public int SchQuantity { get; set; }
        public decimal SchRate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsActive { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}