using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Helpers;
using Shop.API.Models;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public interface IShopRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();

        Task<List<Branch>> GetBranches();
        Task<List<Branch>> GetBranchesByPaging(int PageNo, int PageSize);
        Task<Branch> GetBranch(int id);
        Task<List<PartyType>> GetPartyTypes();
        Task<PartyType> GetPartyType(int id);
        Task<List<Party>> GetParties();
        Task<List<PartyListViewModel>> GetPartyListViewModels(string search, int branchId);
        Task<List<Party>> GetSearchParty(string search);
        Task<Party> GetParty(int id);

        Task<List<User>> GetUsers();
        Task<User> GetUser(int id);

        Task<List<Brand>> GetBrands();
        Task<Brand> GetBrand(int id);

        Task<List<Bank>> GetBanks();
        Task<Bank> GetBank(int id);

        Task<List<Product>> GetProducts();
        Task<List<Product>> GetSearchProducts(string search);
        Task<List<PurchaseOrderItem>> GetSearchSellProducts(string search);
        Task<PurchaseOrderItem> GetPurchaseOrderItem(int id);

        Task<List<PurchaseOrderItem>> GetSearchProductsBatchbyProductId(int productId);

        Task<Product> GetProduct(int id);

        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(int id);

        Task<List<PurchaseOrder>> GetPurchaseOrders();
        Task<List<PurchaseListModel>> GetPurchaseListFromSP(int branchId);
        Task<List<PurchaseReturnListModel>> GetPurchaseReturnListFromSP(int branchId);
        Task<List<PurchaseListModel>> GetPurchaseListByPartyIdFromSP(int partyId);

        Task<PurchaseOrder> GetPurchase(int id);

        Task<List<PurchaseOrderItem>> GetPurchaseOrderItemsByPurchaseId(int purchaseId);
        Task<PurchaseOrderModel> GetPurchaseOrderModelFromSP(int id);
        Task<List<PurchaseOrderItemsModel>> GetPurchaseOrderItemsModelsFromSP(int purchaseId);
        Task<List<PurchaseOrderItemsModel>> GetPurchaseOrderItemsModelsFromParty(int productId, int partyId);

        Task<List<Sale>> GetSales();
        Task<List<SaleListModel>> GetSaleListFromSP();
        Task<SaleOrderModel> GetSaleOrderModelFromSP(int id);
        Task<List<SaleOrderItemsModel>> GetSaleOrderItemsModelsFromSP(int id);

        Task<List<SaleReturnListModel>> GetSaleReturnListFromSP(int branchId);
        Task<List<SaleListModel>> GetSaleListByPartyIdFromSP(int partyId);
        Task<List<SaleListModel>> GetSaleListByPartyIdFromSPForPayment(int partyId);
        Task<Sale> GetSale(int id);

        Task<List<Stock>> GetStocks();
        Task<Stock> GetStock(int id);
        Task<List<StockListModel>> GetStockListByBranchIdFromSP(int branchId);
        Task<List<StockListModel>> GetStockReturnListByBranchIdFromSP(int branchId);
        Task<List<StockListModel>> GetStockTransferListByBranchIdFromSP(int branchId);
        Task<List<ProductStockItemsModel>> GetProductStockItemsModelsFromBranchIdAndProductId(int branchId, int productId);


        Task<List<Tax>> GetTaxes();
        Task<Tax> GetTax(int id);

        // Task<List<Order>> GetOrders(string orderType);
        // Task<Order> GetOrder(int id);

        // Task<List<Inventory>> GetInventoriesByProductIdAndBranchId(int id, int branchId);

        Task<List<Company>> GetCompanies();
        Task<Company> GetCompanybyBranchId(int id);

        Task<Company> GetCompany(int id);

        Task<List<ItemWisePurchaseViewModel>> GetItemWisePurchaseViewModels(ItemWiseParams itemParams);
        Task<List<ItemWiseSaleViewModel>> GetItemWiseSaleViewModels(ItemWiseParams itemParams);

        Task<List<SalesDetailsViewModel>> GetSalesDetails(SaleDetailsParams itemParams);

    }
}