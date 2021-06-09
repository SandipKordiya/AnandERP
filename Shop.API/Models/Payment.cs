using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int UserId { get; set; }
        public int? PurchaseOrderId { get; set; }
        public int? SaleId { get; set; }
        public int? SaleReturnId { get; set; }
        public int? StockId { get; set; }
        public int? StockTransferId { get; set; }
        public int? StockReturnId { get; set; }
        public string PaymentNo { get; set; }
        public int PartyId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMode { get; set; }
        public DateTime PaymentDate { get; set; }
        public string ReferenceNo { get; set; } //check number
        public string SourceBank { get; set; }
        public int BankId { get; set; } // received bank
        public string Remark { get; set; }
        public bool IsReceived { get; set; }
        public string PaymentType { get; set; } // partial payment, full payment, due, pending

        public DateTime Created { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("PartyId")]
        public Party Party { get; set; }

        [ForeignKey("PurchaseOrderId")]
        public PurchaseOrder PurchaseOrder { get; set; }

        [ForeignKey("SaleId")]
        public Sale Sale { get; set; }

        [ForeignKey("SaleReturnId")]
        public SaleReturn SaleReturn { get; set; }

        [ForeignKey("StockId")]
        public Stock Stock { get; set; }

        [ForeignKey("StockTransferId")]
        public StockTransfer StockTransfer { get; set; }

        [ForeignKey("StockReturnId")]
        public StockReturn StockReturn { get; set; }


    }
}