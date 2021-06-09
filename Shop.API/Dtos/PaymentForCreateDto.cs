using System;
using System.Collections.Generic;

namespace Shop.API.Dtos
{
    public class PaymentForCreateDto
    {
        public int BranchId { get; set; }
        public int UserId { get; set; }
        public string PaymentNo { get; set; }
        public int PartyId { get; set; }
        public int OrderId { get; set; }

        public decimal Amount { get; set; }
        public string PaymentMode { get; set; }
        public DateTime PaymentDate { get; set; }
        public string ReferenceNo { get; set; } //check number
        public string SourceBank { get; set; }
        public int BankId { get; set; } // received bank
        public string Remark { get; set; }
        public bool IsReceived { get; set; }
        public string PaymentType { get; set; } // partial payment, full payment, due, pending

        public DateTime Created { get; set; }
    }

    public class PayOrderDto
    {
        public PaymentForCreateDto Model { get; set; }
        public List<OrderPayDto> List { get; set; }
    }
}