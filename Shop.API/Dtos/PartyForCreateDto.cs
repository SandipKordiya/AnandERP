using System;

namespace Shop.API.Dtos
{
    public class PartyForCreateDto
    {
        public int PartyTypeId { get; set; }
        public string PartyCode { get; set; }
        public string Name { get; set; }
        public string InvoiceName { get; set; }
        public string Address { get; set; }

        public int CountryId { get; set; }
        public int StateId { get; set; }
        public int CityId { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Area { get; set; }
        public string Pincode { get; set; }
        public string Telephone { get; set; }
        public string Mobile { get; set; }
        public string WebSite { get; set; }
        public string Email { get; set; }
        public string GSTIN { get; set; }
        public string PanNo { get; set; }
        public string AdharNo { get; set; }
        public string CINNo { get; set; }
        public decimal OpeningBalance { get; set; }
        public string BalanceSign { get; set; }
        public decimal CurrentBalance { get; set; }
        public int CreditDays { get; set; }
        public decimal CreditAmount { get; set; }
        public string Referance { get; set; }
        public string Note { get; set; }
        public DateTime Created { get; set; }
        public int BranchId { get; set; }


    }
}