using System;

namespace Shop.API.ViewModels
{
    public class ProductStockItemsModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int BranchId { get; set; }
        public string BrandName { get; set; }
        public int FromBranchId { get; set; }
        public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public decimal? SaleRate { get; set; }
        public decimal? Rate { get; set; }
        public int Quantity { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public int TaxId { get; set; }
        public string TaxName { get; set; }
        public double TaxRate { get; set; }
        // public decimal? Amount { get; set; }
        public int Stock { get; set; }
        public long OCCURENCE { get; set; }
    }
}