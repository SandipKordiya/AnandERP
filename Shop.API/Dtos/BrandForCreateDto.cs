using System;

namespace Shop.API.Dtos
{
    public class BrandForCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
    }
}