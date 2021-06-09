using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Helpers;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public interface ILedgerRepository
    {
        Task<LedgerBalanceByPartyModel> GetLedgerBalanceByParty(int partyId, string type);
        Task<List<PartyLedgerViewModel>> GetPartyLedgerViewModel(PartyLedgerParams partyLedgerParams);
        Task<List<StockLedgerViewModel>> GetStockLedgerViewModels(StockLedgerParams stockLedgerParams);
        Task<List<StockWarehouseViewModel>> GetStockWarehouseViewModels(StockWarehouseParams stockWarehouseParams);
        Task<List<BranchInventoryModel>> GetBranchInventoryModels(BranchProductDetailParams branchProductDetailParams);



    }
}