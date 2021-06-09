namespace Shop.API.ViewModels
{
    public class StockLedgerViewModel
    {
        public int Id { get; set; }
        public string Branch { get; set; }
        public string Brand { get; set; }
        public string ProductName { get; set; }
        public string BatchNo { get; set; }
        public decimal? MRP { get; set; }
        public decimal? PRate { get; set; }
        public int OpeningQty { get; set; }
        public decimal? OpeningMRP { get; set; }
        public int InwardQty { get; set; }
        public decimal? InwardMRP { get; set; }
        public int OutwardQty { get; set; }
        public decimal? OutwardMRP { get; set; }
        public int ClosingQty { get; set; }
        public decimal? ClosingMRP { get; set; }
    }
}