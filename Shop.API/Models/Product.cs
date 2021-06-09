using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string ProductSKU { get; set; }
        public decimal Rate { get; set; }
        public DateTime TaxEffectDate { get; set; }
        public string HSNCode { get; set; }
        public decimal PurchageRate { get; set; }
        public decimal SaleMargin { get; set; }
        public decimal MRP { get; set; }
        public decimal SaleRate { get; set; }
        public bool IsReturnable { get; set; }
        public bool IsAllowMinStockSale { get; set; }
        public bool IsStockable { get; set; }
        public string Remark { get; set; }
        public int WarrantyMonth { get; set; } // in month
        public DateTime Created { get; set; }

        public int TaxId { get; set; }

        [ForeignKey("BrandId")]
        public Brand Brand { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        [ForeignKey("TaxId")]
        public Tax Tax { get; set; }

        public ICollection<Inventory> Inventories { get; set; }
        public ICollection<SaleScheme> SaleSchemes { get; set; }


    }
}