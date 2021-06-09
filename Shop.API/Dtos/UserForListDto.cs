using System;

namespace Shop.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Type { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}