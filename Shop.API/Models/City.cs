using System;

namespace Shop.API.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StateId { get; set; }
        public string StateCode { get; set; }
        public int CountryId { get; set; }
        public string CountryCode { get; set; }
        public string FipsCode { get; set; }
        public string Iso2 { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime? Updated_at { get; set; }
        public int Flag { get; set; }
        public string WikiDataId { get; set; }

        public State State { get; set; }
        public Country Country { get; set; }
    }
}