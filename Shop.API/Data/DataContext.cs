using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Reflection;
using Shop.API.Models;
using Shop.API.Dtos;
using Shop.API.ViewModels;

namespace Shop.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int,
         IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
          IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<PartyType> PartyTypes { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderItem> PurchaseOrderItems { get; set; }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<StockItem> StockItems { get; set; }

        public DbSet<StockTransfer> StockTransfers { get; set; }
        public DbSet<StockTransferItem> StockTransferItems { get; set; }

        public DbSet<StockReturn> StockReturns { get; set; }
        public DbSet<StockReturnItem> StockReturnItems { get; set; }


        public DbSet<Sale> Sales { get; set; }
        public DbSet<SalesItem> SalesItems { get; set; }

        public DbSet<SaleReturn> SaleReturns { get; set; }
        public DbSet<SaleReturnItem> SaleReturnItems { get; set; }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Bank> Banks { get; set; }

        public DbSet<ProductSearchListDto> ProductSearchListDtos { get; set; }
        public DbSet<PurchaseListModel> PurchaseListModels { get; set; }

        public DbSet<SaleListModel> SaleListModels { get; set; }
        public DbSet<SaleReturnListModel> SaleReturnListModels { get; set; }
        public DbSet<StockListModel> StockListModels { get; set; }
        public DbSet<PurchaseOrderModel> PurchaseOrderModels { get; set; }
        public DbSet<PurchaseOrderItemsModel> PurchaseOrderItemsModels { get; set; }
        public DbSet<PurchaseOrderItemsModel> PurchaseOrderItemsModelsFromParty { get; set; }

        public DbSet<ProductListModel> ProductListModels { get; set; }
        public DbSet<ProductSearchModel> ProductSearchModels { get; set; }
        public DbSet<SaleScheme> SaleSchemes { get; set; }
        public DbSet<SaleOrderModel> SaleOrderModels { get; set; }
        public DbSet<SaleOrderItemsModel> SaleOrderItemsModels { get; set; }
        public DbSet<PurchaseReturn> PurchaseReturns { get; set; }
        public DbSet<PurchaseReturnItem> PurchaseReturnItems { get; set; }
        public DbSet<PurchaseReturnListModel> PurchaseReturnListModels { get; set; }
        public DbSet<ProductStockItemsModel> ProductStockItemsModels { get; set; }
        public DbSet<LedgerBalanceByPartyModel> LedgerBalanceByPartyModels { get; set; }
        public DbSet<Ledger> Ledgers { get; set; }
        public DbSet<PartyLedgerViewModel> PartyLedgerViewModels { get; set; }
        public DbSet<ProductPartyRateSearchListDto> ProductPartyRateSearchListDtos { get; set; }
        public DbSet<ProductSaleOrderItemsModel> ProductSaleOrderItemsModels { get; set; }
        public DbSet<SaleInvoiceDueListViewModel> SaleInvoiceDueListViewModels { get; set; }
        public DbSet<SalesDetailViewModel> SalesDetailViewModels { get; set; }
        public DbSet<PartyListViewModel> PartyListViewModels { get; set; }
        public DbSet<ItemWisePurchaseViewModel> ItemWisePurchaseViewModels { get; set; }
        public DbSet<ItemWiseSaleViewModel> ItemWiseSaleViewModels { get; set; }
        public DbSet<ProductBranchRateSearchListDto> ProductBranchRateSearchListDtos { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<StockLedgerViewModel> StockLedgerViewModels { get; set; }
        public DbSet<StockWarehouseViewModel> StockWarehouseViewModels { get; set; }
        public DbSet<SalesDetailsViewModel> SalesDetailsViewModels { get; set; }
        public DbSet<BranchInventoryModel> BranchInventoryModels { get; set; }
        public DbSet<PaymentListViewModel> PaymentListViewModels { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            builder.Entity<User>()
              .HasMany(ur => ur.UserRoles)
              .WithOne(u => u.User)
              .HasForeignKey(ur => ur.UserId)
              .IsRequired();

            builder.Entity<Role>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<ProductSearchListDto>().HasNoKey();
            builder.Entity<PurchaseListModel>().HasNoKey();
            builder.Entity<SaleListModel>().HasNoKey();
            builder.Entity<SaleReturnListModel>().HasNoKey();
            builder.Entity<StockListModel>().HasNoKey();
            builder.Entity<PurchaseOrderItemsModel>().HasNoKey();
            builder.Entity<PurchaseOrderModel>().HasNoKey();
            builder.Entity<ProductListModel>().HasNoKey();
            builder.Entity<ProductSearchModel>().HasNoKey();
            builder.Entity<SaleOrderModel>().HasNoKey();
            builder.Entity<SaleOrderItemsModel>().HasNoKey();
            builder.Entity<PurchaseReturnListModel>().HasNoKey();
            builder.Entity<ProductStockItemsModel>().HasNoKey();
            builder.Entity<LedgerBalanceByPartyModel>().HasNoKey();
            builder.Entity<PartyLedgerViewModel>().HasNoKey();
            builder.Entity<ProductPartyRateSearchListDto>().HasNoKey();
            builder.Entity<ProductSaleOrderItemsModel>().HasNoKey();
            builder.Entity<SaleInvoiceDueListViewModel>().HasNoKey();
            builder.Entity<SalesDetailViewModel>().HasNoKey();
            builder.Entity<PartyListViewModel>().HasNoKey();
            builder.Entity<ItemWisePurchaseViewModel>().HasNoKey();
            builder.Entity<ItemWiseSaleViewModel>().HasNoKey();
            builder.Entity<ProductBranchRateSearchListDto>().HasNoKey();
            builder.Entity<StockLedgerViewModel>().HasNoKey();
            builder.Entity<StockWarehouseViewModel>().HasNoKey();
            builder.Entity<SalesDetailsViewModel>().HasNoKey();
            builder.Entity<BranchInventoryModel>().HasNoKey();
            builder.Entity<PaymentListViewModel>().HasNoKey();
        }
    }
}