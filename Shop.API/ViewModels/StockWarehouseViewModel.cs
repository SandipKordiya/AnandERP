namespace Shop.API.ViewModels
{
    public class StockWarehouseViewModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int? BranchId { get; set; }
        public string BranchName { get; set; }
        public string BatchNo { get; set; }
        public decimal? Rate { get; set; }
        public int? TotalQuantity { get; set; }
        public decimal? StockValue { get; set; }
    }
}