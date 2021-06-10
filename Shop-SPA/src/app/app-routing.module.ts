import { SelllistComponent } from './sell/selllist/selllist.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { BrandComponent } from './brand/brand.component';
import { ListMembersComponent } from './members/list-members/list-members.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BranchComponent } from './branch/branch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPartyComponent } from './party/add-party/add-party.component';
import { PartyTypeComponent } from './party/party-type/party-type.component';
import { PartyComponent } from './party/party.component';
import { BaseComponent } from './shared/base/base.component';
import { AuthGuard } from './_guards/auth.guard';
import { ListComponent } from './purchase/list/list.component';
import { TaxComponent } from './tax/tax.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ProductViewResolver } from './_resolvers/product-view.resolver';
import { CompanyComponent } from './Company/Company.component';
import { PaymentComponent } from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderResolver } from './_resolvers/order.resolver';
import { SellComponent } from './orders/sell/sell.component';
import { StockComponent } from './orders/stock/stock.component';
import { SaleReturnComponent } from './orders/sale-return/sale-return.component';
import { StockReturnComponent } from './orders/stock-return/stock-return.component';
import { SaleReturnListComponent } from './orders/sale-return-list/sale-return-list.component';
import { StockListComponent } from './orders/stock-list/stock-list.component';
import { StockTransferComponent } from './orders/stock-transfer/stock-transfer.component';
import { OrderInvoiceComponent } from './orders/order-invoice/order-invoice.component';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { UploadBulkComponent } from './product/upload-bulk/upload-bulk.component';
import { PurchaseReturnComponent } from './orders/purchase-return/purchase-return.component';
import { PurchaseReturnListComponent } from './orders/purchase-return-list/purchase-return-list.component';
import { LedgerComponent } from './party/ledger/ledger.component';
import { PartyResolver } from './_resolvers/party.resolver';
import { BankComponent } from './bank/bank.component';
import { InvoiceDueListComponent } from './reporting/invoice-due-list/invoice-due-list.component';
import { SalesDetailsComponent } from './reporting/sales-details/sales-details.component';
import { StockReturnListComponent } from './orders/stock-return-list/stock-return-list.component';
import { ItemWisePurchaseComponent } from './reporting/purchase/item-wise-purchase/item-wise-purchase.component';
import { ItemWiseSalesComponent } from './reporting/sales/item-wise-sales/item-wise-sales.component';
import { PaymentStatusComponent } from './payment/payment-status/payment-status.component';
import { StockLedgerComponent } from './reporting/stock-ledger/stock-ledger.component';
import { StockTransferListComponent } from './orders/stock-transfer-list/stock-transfer-list.component';
import { SalesWarehouseComponent } from './reporting/sales-warehouse/sales-warehouse.component';
import { StockWarehouseComponent } from './reporting/stock-warehouse/stock-warehouse.component';
import { PosComponent } from './pos/pos.component';
import { BranchProductsComponent } from './reporting/branch-products/branch-products.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'branch', component: BranchComponent },
      { path: 'bank', component: BankComponent },
      { path: 'branch/:branchName/users', component: UserComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'partytype', component: PartyTypeComponent },
      { path: 'party/add', component: AddPartyComponent },
      {
        path: 'party/edit/:id',
        component: AddPartyComponent,
        resolve: { party: PartyResolver },
      },
      { path: 'party', component: PartyComponent },
      { path: 'party/ledger', component: LedgerComponent },
      { path: 'tax', component: TaxComponent },
      {
        path: 'order',
        loadChildren: () =>
          import('./_modules/order-module/order-module.module').then(
            (mod) => mod.OrderModuleModule
          ),
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent,
        resolve: { order: OrderResolver },
      },
      { path: 'member/add', component: AddMemberComponent },
      { path: 'members/list', component: ListMembersComponent },
      { path: 'product/list', component: ProductComponent },
      { path: 'product/upload', component: UploadBulkComponent },
      { path: 'product/add', component: AddProductComponent },
      {
        path: 'product/edit/:id',
        component: AddProductComponent,
        resolve: { product: ProductViewResolver },
      },
      {
        path: 'product/view/:id',
        component: ViewProductComponent,
        resolve: { product: ProductViewResolver },
      },

      { path: 'sales/duelist', component: InvoiceDueListComponent },
      { path: 'sales/details', component: SalesDetailsComponent },

      { path: 'purchase/itemwise', component: ItemWisePurchaseComponent },
      { path: 'sales/itemwise', component: ItemWiseSalesComponent },
      { path: 'branch/products', component: BranchProductsComponent },

      { path: 'payment/party/status', component: PaymentStatusComponent },

      { path: 'stock/ledger', component: StockLedgerComponent },
      { path: 'stock/warehouse', component: StockWarehouseComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'pos', component: PosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
