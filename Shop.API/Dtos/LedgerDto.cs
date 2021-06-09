using Shop.API.Models;

namespace Shop.API.Dtos
{
    public class LedgerDto
    {
        public int BranchId { get; set; }
        public int UserId { get; set; }
        public int PartyId { get; set; }
        public int OrderId { get; set; }
        public string OrderType { get; set; }
        public decimal NetAmount { get; set; }
        public decimal OldNetAmount { get; set; }
        public string InvoiceNo { get; set; }
        public Ledger ledger { get; set; }

    }
}