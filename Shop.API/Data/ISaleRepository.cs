using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public interface ISaleRepository
    {
        Task<List<SaleInvoiceDueListViewModel>> GetSaleInvoiceDueListViewModels(int branchId);
        Task<List<SalesDetailViewModel>> GetSalesDetailViewModels(int branchId, DateTime fromDate, DateTime toDate);

    }
}