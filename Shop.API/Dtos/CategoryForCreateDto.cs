using System;

namespace Shop.API.Dtos
{
    public class CategoryForCreateDto
    {
        public string  Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
    }
}