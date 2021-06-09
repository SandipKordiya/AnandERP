using System;

namespace Shop.API.ViewModels
{
    public class SaleReturnListModel
    {
         public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public string PartyName { get; set; }
        public DateTime SaleReturnDate { get; set; }
        public int BranchId { get; set; }
        public DateTime Created { get; set; }
        public string BranchName { get; set; }
        public decimal MRPTotal { get; set; }
        public decimal Amount { get; set; }
        public decimal? Paid { get; set; }
        public decimal Remaining { get; set; }
        public string Status { get; set; }
        public string UserName { get; set; }
    }
}