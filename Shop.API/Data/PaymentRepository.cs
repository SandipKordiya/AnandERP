using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Helpers;
using Shop.API.Models;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext _context;
        public PaymentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<PaymentListViewModel>> GetAllPaymentFromSP(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<PaymentListViewModel> data = await _context.PaymentListViewModels.
                FromSqlRaw("Payments_SelectAll_By_Branch  @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Payment>> GetAllPayments()
        {
            return await _context.Payments
            .Include(x => x.Party).
            ToListAsync();
        }

        public async Task<List<Payment>> GetPaymentByFilter(PaymentParams paymentParams)
        {
            var query = _context.Payments.AsQueryable();
            query = query.Where(u => u.PartyId == paymentParams.PartyId);

            query = query.Where(u => u.Created >= paymentParams.FromDate && u.Created <= paymentParams.ToDate);
            query = paymentParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.Created)
            };

            return await query.ToListAsync();
        }
    }
}