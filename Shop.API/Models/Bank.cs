using System;

namespace Shop.API.Models
{
    public class Bank
    {
        public int Id { get; set; }
        public string BankName { get; set; }
        public string Address { get; set; }
        public string AccountNo { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public string PhoneNo { get; set; }
        public string Ifsc { get; set; }
        public string MicrCode { get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal CurrentBalance { get; set; }
        public bool IsCurrentAccount { get; set; }
        public string PosDetails { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
    }
}