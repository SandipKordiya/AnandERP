using System;

namespace Shop.API.Dtos
{
    public class PartyTypeForCreateDto
    {

        public string Type { get; set; }
        public string PrefixCode { get; set; }
        public bool IsAccountledger { get; set; }
        public DateTime Created { get; set; }
    }
}