using System;

namespace Shop.API.Dtos
{
    public class ProductForCreateDto
    {
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string ProductSKU { get; set; }
        public DateTime? TaxEffectDate { get; set; }
        public string HSNCode { get; set; }
        public decimal PurchageRate { get; set; }
        public decimal SaleMargin { get; set; }
        public decimal MRP { get; set; }
        public decimal SaleRate { get; set; }
        public bool IsReturnable { get; set; }
        public bool IsAllowMinStockSale { get; set; }
        public string Remark { get; set; }
        public int WarrantyMonth { get; set; } // in month
        public bool IsStockable { get; set; }
        public int TaxId { get; set; }
    }
}