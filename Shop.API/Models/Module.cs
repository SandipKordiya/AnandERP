using System.Collections.Generic;

namespace Shop.API.Models
{
    public class Module
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Permission> Permissions { get; set; }
    }
}