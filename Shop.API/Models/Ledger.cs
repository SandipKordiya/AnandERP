using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class Ledger
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int UserId { get; set; }
        public int PartyId { get; set; }
        public int OrderId { get; set; }
        public string OrderType { get; set; }
        public DateTime Created { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Closing { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Remark { get; set; }

        [ForeignKey("BranchId")]
        public Branch Branch { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("PartyId")]
        public Party Party { get; set; }

    }
}