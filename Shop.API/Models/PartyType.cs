using System;

namespace Shop.API.Models
{
    public class PartyType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string PrefixCode { get; set; }
        public bool IsAccountledger { get; set; }
        public DateTime Created { get; set; }

    }
}