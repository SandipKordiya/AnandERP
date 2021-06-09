using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class SalesItem
    {
        public int Id { get; set; }
        public int PartyId { get; set; }
        public int BranchId { get; set; }
        public int SaleId { get; set; }
        public int TaxId { get; set; }
        public int ProductId { get; set; }
        public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int Quantity { get; set; }
        public int InvQuantity { get; set; }
        public int FreeQuantity { get; set; }
        public decimal MRP { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public decimal Amount { get; set; }
        public bool IsSchemeApplied { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        [ForeignKey("SaleId")]
        public Sale Sale { get; set; }

        [ForeignKey("TaxId")]
        public Tax Tax { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

    }
}