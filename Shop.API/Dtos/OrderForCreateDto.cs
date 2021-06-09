using System;
using System.Collections.Generic;

namespace Shop.API.Dtos
{
    public class OrderForCreateDto
    {
        public int PartyId { get; set; }
        public int BranchId { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DueDate { get; set; }
        public string TaxType { get; set; }
        public string Status { get; set; } //ispaid // partialpaid //unpaid
        public decimal GrossAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Other { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public string Description { get; set; }
        public string OrderType { get; set; } //Purchase Or Sell
        public int UserId { get; set; }
    
        public ICollection<OrderItemForCreateDto> OrderItems { get; set; }

    }
}