using System;

namespace Shop.API.Dtos
{
    public class UpdatePartyStatusDto
    {
        public bool IsBillingEnabled { get; set; }
        public DateTime BillingActionDate { get; set; }
    }
}