using System;

namespace Shop.API.ViewModels
{
    public class ItemWisePurchaseViewModel
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public string PartyName { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string BranchName { get; set; }
        public string ProductName { get; set; }
        public string BrandName { get; set; }
        public string BatchNo { get; set; }
        public int ProductId { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public int Quantity { get; set; }
        public int SchQuantity { get; set; }
        public decimal Rate { get; set; }
        public int TaxId { get; set; }
        public double TaxRate { get; set; }
        public decimal Amount { get; set; }
    }

    public class ItemWiseSaleViewModel
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public string PartyName { get; set; }
        public DateTime SaleDate { get; set; }
        public string BranchName { get; set; }
        public string ProductName { get; set; }
        public string BrandName { get; set; }
        public string BatchNo { get; set; }
        public int ProductId { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public int Quantity { get; set; }
        public int FreeQuantity { get; set; }
        public decimal Rate { get; set; }
        public int TaxId { get; set; }
        public double TaxRate { get; set; }
        public decimal Amount { get; set; }
    }
}