using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Shop.API.Dtos;
using Shop.API.Models;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ProductSearchListDto>> GetSearchProducts(string name)
        {
            try
            {

                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@ProductName", name),
                   new SqlParameter("@errorCode", "")
                };

                List<ProductSearchListDto> data = await _context.ProductSearchListDtos.FromSqlRaw("gensp_Products_SelectSomeBySearch @ProductName,@errorCode", param).ToListAsync();
                //  lst = await this.Query<ProductSearchListDto>().FromSql(sqlQuery, usernameParam).ToListAsync();  
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ProductSearchListDto>> GetSearchProductsByProductId(int productId)
        {
            try
            {

                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@ProductId", productId),
                   new SqlParameter("@errorCode", "")
                };

                List<ProductSearchListDto> data = await _context.ProductSearchListDtos.FromSqlRaw("gensp_Products_SelectByProductId @ProductId, @errorCode", param).ToListAsync();
                //  lst = await this.Query<ProductSearchListDto>().FromSql(sqlQuery, usernameParam).ToListAsync();  
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ProductListModel>> GetProductLists()
        {
            try
            {

                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@errorCode", "")
                };

                List<ProductListModel> data = await _context.ProductListModels.FromSqlRaw("gensp_Products_SelectAll @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ProductSearchModel>> GetProductSearchModels(string name)
        {
            try
            {

                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@ProductName",name),
                   new SqlParameter("@errorCode", "")
                };

                List<ProductSearchModel> data = await _context.ProductSearchModels.FromSqlRaw("gensp_Products_SearchByNameForPurchase @ProductName,@errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SaleScheme>> GetSaleSchemes()
        {
            return await _context.SaleSchemes.ToListAsync();
        }

        public async Task<SaleScheme> GetSaleScheme(int id)
        {
            return await _context.SaleSchemes.Where(b => b.ProductId == id)
            .OrderByDescending(p => p.Created)
            .FirstOrDefaultAsync();
        }

        public async Task<SaleScheme> GetSaleSchemeById(int id)
        {
            return await _context.SaleSchemes.Where(b => b.Id == id)
            .FirstOrDefaultAsync();
        }

        public async Task<List<ProductPartyRateSearchListDto>> GetSearchProductsByProductIdAndParty(int productId, int partyId, int branchId)
        {
            try
            {
                var p = "";
                if (partyId == 0)
                    p = "";

                if (partyId != 0)
                    p = partyId.ToString();

                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@ProductId", productId),
                   new SqlParameter("@PartyId", p),
                   new SqlParameter("@errorCode", "")
                };

                List<ProductPartyRateSearchListDto> data = await _context.ProductPartyRateSearchListDtos.FromSqlRaw("gensp_Products_SelectByProductIdAndPartyId @BranchId,@ProductId,@PartyId, @errorCode", param).ToListAsync();
                //  lst = await this.Query<ProductSearchListDto>().FromSql(sqlQuery, usernameParam).ToListAsync();  
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<List<ProductBranchRateSearchListDto>> GetSearchProductsByProductIdAndBatch(int productId, int branchId)
        {
            try
            {

                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@ProductId", productId),
                   new SqlParameter("@errorCode", "")
                };

                List<ProductBranchRateSearchListDto> data = await _context.ProductBranchRateSearchListDtos.FromSqlRaw("gensp_Products_SelectByProductIdAndBranchId @BranchId,@ProductId, @errorCode", param).ToListAsync();
                //  lst = await this.Query<ProductSearchListDto>().FromSql(sqlQuery, usernameParam).ToListAsync();  
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ProductSaleOrderItemsModel>> GetProductSaleOrderItemsModels(int productId, int partyId)
        {
            try
            {

                SqlParameter[] param = new SqlParameter[] {
                       new SqlParameter("@PartyId", partyId),
                   new SqlParameter("@ProductId", productId),
                   new SqlParameter("@errorCode", "")
                };

                List<ProductSaleOrderItemsModel> data = await _context.ProductSaleOrderItemsModels.FromSqlRaw("gensp_ProductsBatchFromSale_SelectByPartyIdAndProductId @PartyId,@ProductId, @errorCode", param).ToListAsync();
                //  lst = await this.Query<ProductSearchListDto>().FromSql(sqlQuery, usernameParam).ToListAsync();  
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}