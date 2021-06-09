using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Helpers;
using Shop.API.Models;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public interface IPaymentRepository
    {
        Task<List<Payment>> GetAllPayments();
        Task<List<PaymentListViewModel>> GetAllPaymentFromSP(int branchId);
        Task<List<Payment>> GetPaymentByFilter(PaymentParams paymentParams);
    }
}