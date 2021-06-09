using System;

namespace Shop.API.Dtos
{
    public class ItemsForCreateDto
    {
        public int PurchaseOrderId { get; set; }
        public int SellOrderId { get; set; }
        public DateTime Created { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string BatchNo { get; set; }
        public decimal  MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public int TaxId { get; set; }
        public decimal Amount { get; set; }
    }
}