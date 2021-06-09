namespace Shop.API.ViewModels
{
    public class BranchInventoryModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int? BranchId { get; set; }
        public string BranchName { get; set; }
        public string BrandName { get; set; }
        public int TaxId { get; set; }
        public string BatchNo { get; set; }
        public decimal? MRP { get; set; }
        public long OCCURENCE { get; set; }
        // public decimal? Rate { get; set; }
        public int Stock { get; set; }
    }
}