using System;

namespace Shop.API.ViewModels
{
    public class PartyLedgerViewModel
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int UserId { get; set; }
        public int PartyId { get; set; }
        public int OrderId { get; set; }
        public string OrderType { get; set; }
        public DateTime Created { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Closing { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Remark { get; set; }
        public string InvoiceNo { get; set; }

    }
}