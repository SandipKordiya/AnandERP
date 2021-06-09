using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public class SaleRepository : ISaleRepository
    {
        private readonly DataContext _context;
        public SaleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<List<SaleInvoiceDueListViewModel>> GetSaleInvoiceDueListViewModels(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", branchId),
                       new SqlParameter("@errorCode", "")
                };

                List<SaleInvoiceDueListViewModel> data = await _context.SaleInvoiceDueListViewModels.FromSqlRaw("gensp_SalesInvoiceDueList_SelectAll @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SalesDetailViewModel>> GetSalesDetailViewModels(int branchId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", branchId),
                     new SqlParameter("@Fromdate", fromDate),
                     new SqlParameter("@Todate", toDate),
                       new SqlParameter("@errorCode", "")
                };

                List<SalesDetailViewModel> data = await _context.SalesDetailViewModels
                .FromSqlRaw("gensp_SalesDetails @BranchId,@Fromdate,@Todate, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}