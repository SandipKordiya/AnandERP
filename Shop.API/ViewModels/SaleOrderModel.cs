using System;

namespace Shop.API.ViewModels
{
    public class SaleOrderModel
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public int BranchId { get; set; }
        public DateTime Created { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Other { get; set; }
        public string Status { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public string PartyName { get; set; }
        public string BranchName { get; set; }
    }
}