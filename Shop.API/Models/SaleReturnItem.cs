using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class SaleReturnItem
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int SaleReturnId { get; set; }
        public int TaxId { get; set; }
        public int ProductId { get; set; }
        public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public DateTime Created { get; set; }
        public int Quantity { get; set; }
        public int InvQuantity { get; set; }
        public int FreeQuantity { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }

        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal CreditDiscount { get; set; }
        public decimal Amount { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        [ForeignKey("SaleReturnId")]
        public SaleReturn SaleReturn { get; set; }

        [ForeignKey("TaxId")]
        public Tax Tax { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}