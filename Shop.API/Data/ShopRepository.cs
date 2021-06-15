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
    public class ShopRepository : IShopRepository
    {
        private readonly DataContext _context;
        public ShopRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Branch> GetBranch(int id)
        {
            return await _context.Branches.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Branch>> GetBranches()
        {
            return await _context.Branches.ToListAsync();
        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users
            .Include(m => m.Branch)
            .ToListAsync();
        }

        public async Task<List<Party>> GetParties()
        {
            return await _context.Parties.ToListAsync();
        }

        public async Task<Party> GetParty(int id)
        {
            return await _context.Parties.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<PartyType> GetPartyType(int id)
        {
            return await _context.PartyTypes.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<PartyType>> GetPartyTypes()
        {
            return await _context.PartyTypes.ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Brand>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Brand> GetBrand(int id)
        {
            return await _context.Brands.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategory(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Product>> GetSearchProducts(string search)
        {
            var products = _context.Products.AsQueryable();
            return await products.Where(u => u.ProductName.Contains(search)).ToListAsync();
        }

        public async Task<List<PurchaseOrderItem>> GetSearchSellProducts(string search)
        {
            var products = _context.PurchaseOrderItems
            .Include(p => p.Product)
            .AsQueryable();
            return await products.Where(u => u.Product.ProductName.Contains(search)).ToListAsync();
        }

        public async Task<List<Party>> GetSearchParty(string search)
        {
            var party = _context.Parties
            .Include(x => x.PartyType)
            .AsQueryable();
            return await party.Where(u => u.Name.Contains(search)).ToListAsync();
        }

        public async Task<List<PurchaseOrder>> GetPurchaseOrders()
        {
            return await _context.PurchaseOrders.ToListAsync();
        }

        public async Task<PurchaseOrder> GetPurchase(int id)
        {
            return await _context.PurchaseOrders
            .Include(x => x.PurchaseOrderItems)
            .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Sale>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        public async Task<Sale> GetSale(int id)
        {
            return await _context.Sales
            .Include(b => b.SalesItems)
            .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Stock>> GetStocks()
        {
            return await _context.Stocks.ToListAsync();
        }
        public async Task<Stock> GetStock(int id)
        {
            return await _context.Stocks.FirstOrDefaultAsync(b => b.Id == id);
        }

        // public async Task<Stock> GetStockByProductAndBranch(int productId, int branchId)
        // {
        //     return await _context.Stocks.FirstOrDefaultAsync(b => b.Id == productId && b.BranchId == branchId);
        // }

        public async Task<List<Tax>> GetTaxes()
        {
            return await _context.Taxes.ToListAsync();
        }

        public async Task<Tax> GetTax(int id)
        {
            return await _context.Taxes.FirstOrDefaultAsync(b => b.Id == id);
        }

        // public async Task<List<Inventory>> GetInventoriesByProductIdAndBranchId(int id, int branchId)
        // {
        //     return await _context.Inventories.Where(p => p.ProductId == id && p.BranchId == branchId).ToListAsync();
        // }

        // public async Task<List<Order>> GetOrders(string orderType)
        // {
        //     // var result;
        //     if (orderType == null)
        //     {
        //         return await _context.Orders.ToListAsync();
        //     }
        //     else
        //     {
        //         return await _context.Orders.Where(m => m.OrderType == orderType).ToListAsync();
        //     }


        // }

        // public async Task<Order> GetOrder(int id)
        // {
        //     return await _context.Orders
        //     .Include(m => m.OrderItems)
        //     .Include(m => m.Payments)
        //     .Include(m => m.Party)
        //     .Include(m => m.Branch)
        //     .FirstOrDefaultAsync(b => b.Id == id);
        // }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            return user;
        }

        public async Task<List<Company>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> GetCompanybyBranchId(int id)
        {
            return await _context.Companies.Where(b => b.BranchId == id)
            .OrderByDescending(p => p.Created)
            .FirstOrDefaultAsync();
        }

        public async Task<Company> GetCompany(int id)
        {
            return await _context.Companies
            .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<PurchaseOrderItem>> GetSearchProductsBatchbyProductId(int productId)
        {
            return await _context.PurchaseOrderItems
           .Where(b => b.ProductId == productId).ToListAsync();
        }

        public async Task<List<PurchaseListModel>> GetPurchaseListFromSP(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<PurchaseListModel> data = await _context.PurchaseListModels.FromSqlRaw("gensp_Purchase_SelectAll  @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<PurchaseListModel>> GetPurchaseListByPartyIdFromSP(int partyId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@PartyId", partyId),
                   new SqlParameter("@errorCode", "")
                };

                List<PurchaseListModel> data = await _context.PurchaseListModels.FromSqlRaw("gensp_PurchaseOrders_SelectByPartyId @PartyId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SaleListModel>> GetSaleListFromSP()
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                   new SqlParameter("@errorCode", "")
                };

                List<SaleListModel> data = await _context.SaleListModels.FromSqlRaw("gensp_Sale_SelectAll @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<List<SaleReturnListModel>> GetSaleReturnListFromSP(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<SaleReturnListModel> data = await _context.SaleReturnListModels.FromSqlRaw("gensp_Sale_Return_SelectAll @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SaleListModel>> GetSaleListByPartyIdFromSP(int partyId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                       new SqlParameter("@PartyId", partyId),
                   new SqlParameter("@errorCode", "")
                };

                List<SaleListModel> data = await _context.SaleListModels.FromSqlRaw("gensp_Sales_SelectByPartyId @PartyId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SaleListModel>> GetSaleListByPartyIdFromSPForPayment(int partyId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                       new SqlParameter("@PartyId", partyId),
                   new SqlParameter("@errorCode", "")
                };

                List<SaleListModel> data = await _context.SaleListModels.FromSqlRaw("gensp_Sales_SelectForPaymentPartyId @PartyId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Bank>> GetBanks()
        {
            return await _context.Banks.ToListAsync();
        }

        public async Task<Bank> GetBank(int id)
        {
            return await _context.Banks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<StockListModel>> GetStockListByBranchIdFromSP(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                       new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<StockListModel> data = await _context.StockListModels.FromSqlRaw("gensp_Stock_SelectAll @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<StockListModel>> GetStockReturnListByBranchIdFromSP(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                       new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<StockListModel> data = await _context.StockListModels.FromSqlRaw("gensp_Stock_Return_SelectAll @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<StockListModel>> GetStockTransferListByBranchIdFromSP(int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                       new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<StockListModel> data = await _context.StockListModels.FromSqlRaw("gensp_Stock_Transfer_SelectAll @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Branch>> GetBranchesByPaging(int PageNo, int PageSize)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@PageNo", PageNo),
                      new SqlParameter("@PageSize", PageSize),
                       new SqlParameter("@SortOrder", "")
                };

                List<Branch> data = await _context.Branches.FromSqlRaw("gensp_GetAllBranchByPaging @PageNo, @PageSize, @SortOrder", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<PurchaseOrderItem>> GetPurchaseOrderItemsByPurchaseId(int purchaseId)
        {
            return await _context.PurchaseOrderItems.Where(x => x.PurchaseOrderId == purchaseId).ToListAsync();
        }

        public async Task<List<PurchaseOrderItemsModel>> GetPurchaseOrderItemsModelsFromSP(int purchaseId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@purchaseId", purchaseId),
                       new SqlParameter("@SortOrder", "")
                };

                List<PurchaseOrderItemsModel> data = await _context.PurchaseOrderItemsModels.
                FromSqlRaw("gensp_PurchaseOrderItemsByPurchaseOrder @purchaseId, @SortOrder", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<PurchaseOrderModel> GetPurchaseOrderModelFromSP(int id)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@Id", id),
                   new SqlParameter("@errorCode", "")
                };

                List<PurchaseOrderModel> data = await _context.PurchaseOrderModels.FromSqlRaw("gensp_PurchaseOrderById @Id, @errorCode", param).ToListAsync();
                PurchaseOrderModel result = data[0];
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<SaleOrderModel> GetSaleOrderModelFromSP(int id)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@Id", id),
                   new SqlParameter("@errorCode", "")
                };

                List<SaleOrderModel> data = await _context.SaleOrderModels.FromSqlRaw("gensp_SaleOrderById @Id, @errorCode", param).ToListAsync();
                SaleOrderModel result = data[0];
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SaleOrderItemsModel>> GetSaleOrderItemsModelsFromSP(int id)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@SaleId", id),
                       new SqlParameter("@errorCode", "")
                };

                List<SaleOrderItemsModel> data = await _context.SaleOrderItemsModels.FromSqlRaw("gensp_SaleOrderItemsBySaleOrder @SaleId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<PurchaseOrderItemsModel>> GetPurchaseOrderItemsModelsFromParty(int productId, int partyId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@PartyId", partyId),
                     new SqlParameter("@ProductId", productId),
                       new SqlParameter("@errorCode", "")
                };

                List<PurchaseOrderItemsModel> data = await _context.PurchaseOrderItemsModelsFromParty.FromSqlRaw("gensp_ProductsFromPurchase_SelectByPartyIdAndProductId @PartyId,@ProductId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<PurchaseReturnListModel>> GetPurchaseReturnListFromSP(int branchId = 0)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                    new SqlParameter("@BranchId", branchId),
                   new SqlParameter("@errorCode", "")
                };

                List<PurchaseReturnListModel> data = await _context.PurchaseReturnListModels.FromSqlRaw("gensp_PurchaseReturn_SelectAll @BranchId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ProductStockItemsModel>> GetProductStockItemsModelsFromBranchIdAndProductId(int branchId, int productId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", branchId),
                     new SqlParameter("@ProductId", productId),
                       new SqlParameter("@errorCode", "")
                };

                List<ProductStockItemsModel> data = await _context.ProductStockItemsModels.FromSqlRaw("gensp_ProductsBatchFromStock_SelectByBranchIdAndProductId @BranchId,@ProductId, @errorCode", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<PurchaseOrderItem> GetPurchaseOrderItem(int id)
        {
            return await _context.PurchaseOrderItems.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<PartyListViewModel>> GetPartyListViewModels(string search, int branchId)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@Search", search),
                     new SqlParameter("@BranchId", branchId),
                       new SqlParameter("@SortOrder", "")
                };

                List<PartyListViewModel> data = await _context.PartyListViewModels.
                FromSqlRaw("gensp_Party_List @Search,@BranchId, @SortOrder", param).ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ItemWisePurchaseViewModel>> GetItemWisePurchaseViewModels(ItemWiseParams itemParams)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", itemParams.BranchId),
                     new SqlParameter("@Fromdate", itemParams.FromDate),
                     new SqlParameter("@Todate", itemParams.ToDate),
                     new SqlParameter("@BrandId", itemParams.BrandId),
                     new SqlParameter("@ProductId", itemParams.ProductId),
                     new SqlParameter("@PartyId", itemParams.PartyId),
                       new SqlParameter("@errorCode", "")
                };

                List<ItemWisePurchaseViewModel> data = await _context.ItemWisePurchaseViewModels
                .FromSqlRaw("gensp_Itemwise_Purchase_report @BranchId,@Fromdate, @Todate,@BrandId, @ProductId,@PartyId, @errorCode", param).
                ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<ItemWiseSaleViewModel>> GetItemWiseSaleViewModels(ItemWiseParams itemParams)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", itemParams.BranchId),
                     new SqlParameter("@Fromdate", itemParams.FromDate),
                     new SqlParameter("@Todate", itemParams.ToDate),
                     new SqlParameter("@BrandId", itemParams.BrandId),
                     new SqlParameter("@ProductId", itemParams.ProductId),
                     new SqlParameter("@PartyId", itemParams.PartyId),
                       new SqlParameter("@errorCode", "")
                };

                List<ItemWiseSaleViewModel> data = await _context.ItemWiseSaleViewModels
                .FromSqlRaw("gensp_Itemwise_Sale_report @BranchId,@Fromdate, @Todate,@BrandId, @ProductId,@PartyId, @errorCode", param).
                ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SalesDetailsViewModel>> GetSalesDetails(SaleDetailsParams itemParams)
        {
            try
            {
                SqlParameter[] param = new SqlParameter[] {
                     new SqlParameter("@BranchId", itemParams.BranchId),
                     new SqlParameter("@Fromdate", itemParams.FromDate),
                     new SqlParameter("@Todate", itemParams.ToDate),
                     new SqlParameter("@BrandId", itemParams.BrandId),
                     new SqlParameter("@ProductId", itemParams.ProductId),
                     new SqlParameter("@PartyId", itemParams.PartyId),
                     new SqlParameter("@PartyTypeId", itemParams.PartyTypeId),
                       new SqlParameter("@errorCode", "")
                };

                List<SalesDetailsViewModel> data = await _context.SalesDetailsViewModels
                .FromSqlRaw("SalesDetails @BranchId,@Fromdate, @Todate,@BrandId, @ProductId,@PartyId,@PartyTypeId, @errorCode", param).
                ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}