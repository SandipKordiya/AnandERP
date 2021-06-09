using System;
using System.Collections.Generic;

namespace Shop.API.Dtos
{
    public class StockReturnForCreateDto
    {
        public int BranchId { get; set; }
        // public int PartyId { get; set; }
        public int UserId { get; set; }
        public DateTime Created { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime PurchaseDate { get; set; } //Stock Return Date
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
        public ICollection<StockReturnItemsForCreateDto> StockReturnItems { get; set; }

    }
}