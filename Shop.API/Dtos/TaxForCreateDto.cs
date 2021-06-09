using System;

namespace Shop.API.Dtos
{
    public class TaxForCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Rate { get; set; }
        public DateTime Created { get; set; }
    }
}