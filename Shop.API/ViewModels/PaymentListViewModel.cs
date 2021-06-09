using System;

namespace Shop.API.ViewModels
{
    public class PaymentListViewModel
    {
        public int Id { get; set; }
        public string PaymentNo { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime Created { get; set; }
        public string PartyName { get; set; }
        public string PaymentType { get; set; }
        public string PaymentMode { get; set; }
        public decimal Amount { get; set; }
        public string UserName { get; set; }
    }
}