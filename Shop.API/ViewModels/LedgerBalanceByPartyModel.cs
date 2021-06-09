namespace Shop.API.ViewModels
{
    public class LedgerBalanceByPartyModel
    {
        public int PartyId { get; set; }
        public decimal TotalDebit { get; set; }
        public decimal TotalCredit { get; set; }
        public decimal Closing { get; set; }

    }
}