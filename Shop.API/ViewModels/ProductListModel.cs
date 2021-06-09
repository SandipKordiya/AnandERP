using System;

namespace Shop.API.ViewModels
{
    public class ProductListModel
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int TaxId { get; set; }
        public string TaxName { get; set; }
        public double TaxRate { get; set; }
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
        public bool IsStockable { get; set; }
        public string Remark { get; set; }
        public int WarrantyMonth { get; set; } // in month
        public DateTime Created { get; set; }


    }

    public class ProductSaleOrderItemsModel
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public int? PartyId { get; set; }
        public int? ProductId { get; set; }
        public string ProductName { get; set; }
        public int? BranchId { get; set; }
        public string BatchNo { get; set; }
        public DateTime? ExpireDate { get; set; }
        public decimal? MRP { get; set; }
        public decimal? SaleRate { get; set; }
        public decimal? Rate { get; set; }
        public int? Quantity { get; set; }
        public int? FreeQuantity { get; set; }
        public decimal? Discount { get; set; }
        public decimal? OtherDiscount { get; set; }
        public int? TaxId { get; set; }
        public string TaxName { get; set; }
        public double? TaxRate { get; set; }
        public decimal? Amount { get; set; }
        public int Stock { get; set; }
    }
}