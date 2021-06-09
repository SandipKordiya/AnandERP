using System;

namespace Shop.API.Models
{
    public class Batch
    {
        public int Id { get; set; }
        public int PurchaseId { get; set; }
        public string BatchNo { get; set; }
        public DateTime Created { get; set; }
    }
}