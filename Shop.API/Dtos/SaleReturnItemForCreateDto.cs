using System;

namespace Shop.API.Dtos
{
    public class SaleReturnItemForCreateDto
    {
        public int BranchId { get; set; }
        public int SaleId { get; set; }
        public int TaxId { get; set; }
        public int ProductId { get; set; }
        public string BatchNo { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int Quantity { get; set; }
        public int InvQuantity { get; set; }
        public int FreeQuantity { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal MRP { get; set; }
        public decimal MRPDiscount { get; set; }
        public decimal Rate { get; set; }
        public decimal SaleRate { get; set; }
        public decimal Discount { get; set; }
        public decimal CreditDiscount { get; set; }
        public decimal Amount { get; set; }
    }
}