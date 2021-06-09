using System;

namespace Shop.API.Dtos
{
    public class SaleSchemeForCreateDto
    {
        public int BranchId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int SchQuantity { get; set; }
        public decimal SchRate { get; set; }
    }
}