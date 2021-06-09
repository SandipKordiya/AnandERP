using System;

namespace Shop.API.Dtos
{
    public class CompanyForUpdateDto
    {
        public string Name { get; set; }
        public string Heading { get; set; }
        public string Address { get; set; }
       public int StateId { get; set; }
        public int CityId { get; set; }
        public string Mobile { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string ContactPerson { get; set; }
        public string Designation { get; set; }
        public string AddressLabel { get; set; }
        public string GSTIN { get; set; }
        public string CINO { get; set; }
        public string PANNO { get; set; }
        public bool IsActive { get; set; }
        public string LoginURL { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
    }
}