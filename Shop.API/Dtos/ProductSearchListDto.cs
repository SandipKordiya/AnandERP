using System;

namespace Shop.API.Dtos
{
    public class ProductSearchListDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int BranchId { get; set; }
        public string BrandName { get; set; }
        public int TaxId { get; set; }
         public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public int Stock { get; set; }
    }

    public class ProductPartyRateSearchListDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int BranchId { get; set; }
        public string BrandName { get; set; }
        public int TaxId { get; set; }
         public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal? PastSaleRate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public int Stock { get; set; }
    }

    public class ProductBranchRateSearchListDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int BranchId { get; set; }
        public string BrandName { get; set; }
        public int TaxId { get; set; }
         public string BatchNo { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public int Stock { get; set; }
    }
}