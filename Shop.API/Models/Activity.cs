using System;

namespace Shop.API.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public DateTime Created { get; set; }
    }
}