using System;

namespace Shop.API.ViewModels
{
    public class PurchaseOrderModel
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public int BranchId { get; set; }
        public DateTime Created { get; set; }
        public DateTime PurchaseDate { get; set; }
        public bool IsVoucher { get; set; }
        public string Status { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Other { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public int PartyId { get; set; }
        public string PartyName { get; set; }
        public string BranchName { get; set; }
    }
}