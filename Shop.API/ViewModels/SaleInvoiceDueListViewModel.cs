using System;

namespace Shop.API.ViewModels
{
    public class SaleInvoiceDueListViewModel
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime SaleDate { get; set; }
        public DateTime DueDate { get; set; }
        public string PartyName { get; set; }
        public string PartyMobile { get; set; }
        public int PartyCreditDays { get; set; }
        public decimal NetAmount { get; set; }
        public decimal Paid { get; set; }
        public decimal Remaining { get; set; }
        public string Status { get; set; }
        public int TotalDays { get; set; }
    }
}