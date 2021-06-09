namespace Shop.API.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BranchId { get; set; }
        public int ModuleId { get; set; }
        public User User { get; set; }
        public Branch Branch { get; set; }
        public Module Module { get; set; }
    }
}