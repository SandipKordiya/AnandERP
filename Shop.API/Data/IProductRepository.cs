using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Dtos;
using Shop.API.Models;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public interface IProductRepository
    {
        Task<List<ProductSearchListDto>> GetSearchProducts(string name);
        Task<List<ProductSearchListDto>> GetSearchProductsByProductId(int productId);
        Task<List<ProductPartyRateSearchListDto>> GetSearchProductsByProductIdAndParty(int productId, int partyId, int branchId);
        Task<List<ProductBranchRateSearchListDto>> GetSearchProductsByProductIdAndBatch(int productId, int branchId);
        Task<List<ProductSaleOrderItemsModel>> GetProductSaleOrderItemsModels(int productId, int partyId);
        Task<List<ProductListModel>> GetProductLists();

        Task<List<ProductSearchModel>> GetProductSearchModels(string name);

        Task<List<SaleScheme>> GetSaleSchemes();
        Task<SaleScheme> GetSaleScheme(int id);
        Task<SaleScheme> GetSaleSchemeById(int id);
    }
}