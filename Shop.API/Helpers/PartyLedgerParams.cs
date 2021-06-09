using System;

namespace Shop.API.Helpers
{
    public class PartyLedgerParams
    {
        public int PartyId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsSale { get; set; }
    }

    public class ItemWiseParams
    {
        public int BranchId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? BrandId { get; set; } = null;
        public int? ProductId { get; set; } = null;
        public int? PartyId { get; set; } = null;

    }


    public class PaymentParams
    {
        // public int BranchId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? PartyId { get; set; } = null;
        public string OrderBy { get; set; } = "created";
    }

    public class StockLedgerParams
    {
        public int BranchId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int BrandId { get; set; } = 0;

    }

    public class StockWarehouseParams
    {
        public int BranchId { get; set; } = 0;
        public int ProductId { get; set; } = 0;
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }

    public class SaleDetailsParams
    {
        public int BranchId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? BrandId { get; set; } = null;
        public int? ProductId { get; set; } = null;
        public int? PartyId { get; set; } = null;
        public int? PartyTypeId { get; set; } = null;
    }


     public class BranchProductDetailParams
    {
        public int BranchId { get; set; }
        public int? BrandId { get; set; } = null;
        public int? ProductId { get; set; } = null;
        // public string product { get; set; }
    }
}