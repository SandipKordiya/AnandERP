using AutoMapper;
using Shop.API.Dtos;
using Shop.API.Models;

namespace Shop.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<BranchForCreateDto, Branch>();
            CreateMap<BranchForUpdateDto, Branch>();
            CreateMap<BankForCreateDto, Bank>();

            CreateMap<PartyTypeForCreateDto, PartyType>();
            CreateMap<PartyTypeForUpdateDto, PartyType>();
            CreateMap<PartyForCreateDto, Party>();
            CreateMap<UpdatePartyStatusDto, Party>();
            CreateMap<BrandForCreateDto, Brand>();
            CreateMap<CategoryForCreateDto, Category>();
            CreateMap<CompanyForCreateDto, Company>();
            CreateMap<CompanyForUpdateDto, Company>();

            CreateMap<PaymentForCreateDto, Payment>();

            CreateMap<User, UserForListDto>()
              .ForMember(dest => dest.BranchName, otp =>
             {
                 otp.MapFrom(src => src.Branch.Name);
             });
            CreateMap<ProductForCreateDto, Product>();

            CreateMap<PurchaseForCreateDto, PurchaseOrder>();
            CreateMap<PurchaseForUpdateDto, PurchaseOrder>();
            CreateMap<PurchaseOrderItemForCreateDto, PurchaseOrderItem>();
            CreateMap<PurchaseOrderItemForUpdateDto, PurchaseOrderItem>();
            CreateMap<OrderStatusUpdate, PurchaseOrder>();

            CreateMap<PurchaseReturnForCreateDto, PurchaseReturn>();
            CreateMap<PurchaseReturnItemForCreateDto, PurchaseReturnItem>();


            CreateMap<StockForCreateDto, Stock>();
            CreateMap<StockItemForCreateDto, StockItem>();

            CreateMap<StockReturnForCreateDto, StockReturn>();
            CreateMap<StockReturnItemsForCreateDto, StockReturnItem>();

            CreateMap<StockTransferForCreateDto, StockTransfer>();
            CreateMap<StockTransferItemForCreateDto, StockTransferItem>();

            CreateMap<SaleForCreateDto, Sale>();
            CreateMap<SaleItemForCreateDto, SalesItem>();
            CreateMap<SaleForUpdateDto, Sale>();
            CreateMap<SaleItemForUpdateDto, SalesItem>();
            CreateMap<OrderStatusUpdate, Sale>();

            CreateMap<SaleReturnForCreateDto, SaleReturn>();
            CreateMap<SaleReturnItemForCreateDto, SaleReturnItem>();

            CreateMap<TaxForCreateDto, Tax>();
            CreateMap<SaleSchemeForCreateDto, SaleScheme>();
            CreateMap<SaleSchemeForUpdateDto, SaleScheme>();
        }
    }
}