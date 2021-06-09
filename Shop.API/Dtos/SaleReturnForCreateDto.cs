using System;
using System.Collections.Generic;

namespace Shop.API.Dtos
{
    public class SaleReturnForCreateDto
    {
        public string InvoiceNo { get; set; }
        public int BranchId { get; set; }
        public int PartyId { get; set; }
        public int UserId { get; set; }
        public DateTime Created { get; set; }
        public DateTime SaleReturnDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Doctor { get; set; }
        public int TaxGroupId { get; set; }
        public bool IsRetail { get; set; }
        public int TotalItems { get; set; }
        public string Status { get; set; }
        public decimal MrpTotal { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalTax { get; set; }
        public decimal Other { get; set; }
        public decimal RoundOff { get; set; }
        public decimal NetAmount { get; set; }
        public string Description { get; set; }

        public bool IsPaid { get; set; }
        public ICollection<SaleReturnItemForCreateDto> SaleReturnItems { get; set; }

    }
}