namespace Shop.API.ViewModels
{
    public class PartyListViewModel
    {
        public int Id { get; set; }
        public string PartyType { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public int CreditDays { get; set; }
        public int StateId { get; set; }
        public int CityId { get; set; }
        public string GSTIN { get; set; }
        public int? TotalDays { get; set; }
        public bool? IsBillingEnabled { get; set; }
    }
}