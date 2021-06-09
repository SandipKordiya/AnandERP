using System.Threading.Tasks;
using Shop.API.Dtos;

namespace Shop.API.Interfaces
{
    public interface ILedgerService
    {
        Task<bool> CreateSaleLedger(int userId, string type, LedgerDto model);
        Task<bool> CreateSaleReturnLedger(int userId, string type, LedgerDto model);
        Task<bool> UpdateLedger(int userId, string type, LedgerDto model);
        // void Add<T>(T entity) where T : class;
        // void updateLedger(LedgerDto model);

        Task<bool> CreatePurchaseLedger(int userId, string type, LedgerDto model);
        Task<bool> CreatePurchaseReturnLedger(int userId, string type, LedgerDto model);
    }
}