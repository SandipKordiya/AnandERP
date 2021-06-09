using System;

namespace Shop.API.Dtos
{
    public class OrderItemForCreateDto
    {
        public int BranchId { get; set; }
        // public int OrderId { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public bool IsSell { get; set; }
        public int SellQuantity { get; set; }
        public DateTime ExpireDate { get; set; }
        public string BatchNo { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal OtherDiscount { get; set; }
        public int TaxId { get; set; }
        public decimal Amount { get; set; }
        public string OrderType { get; set; } //Purchase Or Sell
    }
}