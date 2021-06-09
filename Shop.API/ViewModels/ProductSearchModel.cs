namespace Shop.API.ViewModels
{
    public class ProductSearchModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public decimal MRP { get; set; }
        public decimal SaleMargin { get; set; }
        public int TaxId { get; set; }
        public string TaxName { get; set; }
        public double TaxRate { get; set; }

    }
}