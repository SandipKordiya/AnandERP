using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        // public int PartyId { get; set; }
        public int UserId { get; set; }
        public DateTime Created { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Status { get; set; } //ispaid // partialpaid //unpaid
        public bool IsPaid { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Other { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public string Description { get; set; }

        public bool IsForStock { get; set; }
        public int FromBranchId { get; set; }
        public bool? IsReceivedConfirm { get; set; }
        public DateTime? ReceivedDateTime { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        // [ForeignKey("PartyId")]
        // public Party Party { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
        public ICollection<StockItem> StockItems { get; set; }

    }
}