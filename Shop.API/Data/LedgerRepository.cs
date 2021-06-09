using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Shop.API.Helpers;
using Shop.API.Models;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public class LedgerRepository : ILedgerRepository
    {
        private readonly DataContext _context;
        public LedgerRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<BranchInventoryModel>> GetBranchInventoryModels(BranchProductDetailParams branchProductDetailParams)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", branchProductDetailParams.BranchId),
                     new SqlParameter("@BrandId", branchProductDetailParams.BrandId),
                     new SqlParameter("@ProductId", branchProductDetailParams.ProductId),
                       new SqlParameter("@errorCode", "")
                };

                List<BranchInventoryModel> data = await _context.BranchInventoryModels
                     .FromSqlRaw("BranchProductDetails @BranchId,@BrandId,@ProductId, @errorCode", param)
                     .ToListAsync();

                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<LedgerBalanceByPartyModel> GetLedgerBalanceByParty(int partyId, string type)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@PartyId", partyId),
                       new SqlParameter("@errorCode", "")
                };
                List<LedgerBalanceByPartyModel> data = new List<LedgerBalanceByPartyModel>();
                if (type == "Purchase" || type == "PurchaseReturn")
                    data = await _context.LedgerBalanceByPartyModels
                    .FromSqlRaw("gensp_Ledger_Purchase_SelectByPartyAndType @PartyId, @errorCode", param)
                    .ToListAsync();

                if (type == "Sale" || type == "SaleReturn")
                    data = await _context.LedgerBalanceByPartyModels
                    .FromSqlRaw("gensp_Ledger_Sale_SelectByPartyAndType @PartyId, @errorCode", param)
                    .ToListAsync();

                if (data.Count == 0)
                    return null;

                return data.First();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<PartyLedgerViewModel>> GetPartyLedgerViewModel(PartyLedgerParams model)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@PartyId", model.PartyId),
                     new SqlParameter("@Fromdate", model.FromDate),
                     new SqlParameter("@Todate", model.ToDate),
                       new SqlParameter("@errorCode", "")
                };

                if (model.IsSale == true)
                {
                    List<PartyLedgerViewModel> data = await _context.PartyLedgerViewModels
                     .FromSqlRaw("gensp_Ledger_SelectByPartyAndDate @PartyId,@Fromdate,@Todate, @errorCode", param)
                     .ToListAsync();

                    return data;
                }
                else
                {
                    List<PartyLedgerViewModel> data = await _context.PartyLedgerViewModels
                    .FromSqlRaw("gensp_Purchase_Ledger_SelectByPartyAndDate @PartyId,@Fromdate,@Todate, @errorCode", param)
                    .ToListAsync();

                    return data;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<StockLedgerViewModel>> GetStockLedgerViewModels(StockLedgerParams stockLedgerParams)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", stockLedgerParams.BranchId),
                     new SqlParameter("@BrandId", stockLedgerParams.BrandId),
                     new SqlParameter("@Fromdate", stockLedgerParams.FromDate),
                     new SqlParameter("@Todate", stockLedgerParams.ToDate)
                };

                List<StockLedgerViewModel> data = await _context.StockLedgerViewModels
                     .FromSqlRaw("Stock_Ledger @BranchId,@BrandId, @Fromdate,@Todate", param)
                     .ToListAsync();

                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<StockWarehouseViewModel>> GetStockWarehouseViewModels(StockWarehouseParams stockWarehouseParams)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", stockWarehouseParams.BranchId),
                     new SqlParameter("@ProductId", stockWarehouseParams.ProductId),
                     new SqlParameter("@Fromdate", stockWarehouseParams.FromDate),
                     new SqlParameter("@Todate", stockWarehouseParams.ToDate)
                };

                List<StockWarehouseViewModel> data = await _context.StockWarehouseViewModels
                     .FromSqlRaw("Stock_By_Warehouse @BranchId,@ProductId, @Fromdate,@Todate", param)
                     .ToListAsync();

                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}