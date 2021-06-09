using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class StockReturnItem
    {
         public int Id { get; set; }
        public int StockReturnId { get; set; }
        public int BranchId { get; set; }
        public int FromBranchId { get; set; }
        public int TaxId { get; set; }
        public int ProductId { get; set; }
        public DateTime Created { get; set; }
        public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public int Quantity { get; set; }
        public int SchQuantity { get; set; }
        public int SaleQuantity { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } // Purchase, Transfer Received from branch, 

        public bool IsForStock { get; set; }
        
        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        [ForeignKey("TaxId")]
        public Tax Tax { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [ForeignKey("StockReturnId")]
        public StockReturn StockReturn { get; set; }
    }
}