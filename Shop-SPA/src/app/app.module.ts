import { SelllistComponent } from './sell/selllist/selllist.component';
import { ListComponent } from './purchase/list/list.component';
import { ShopService } from './_services/shop.service';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductService } from './_services/product.service';
import { BrandService } from './_services/brand.service';
import { UserService } from './_services/user.service';
import { ListMembersComponent } from './members/list-members/list-members.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { PartyService } from 'src/app/_services/party.service';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './branch/branch.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BankComponent } from './bank/bank.component';
import { BranchService } from './_services/branch.service';
import { PartyComponent } from './party/party.component';
import { PartyTypeComponent } from './party/party-type/party-type.component';
import { AddPartyComponent } from './party/add-party/add-party.component';
import { AlertifyService } from './_services/alertify.service';
import { JwtModule } from '@auth0/angular-jwt';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DataTablesModule } from 'angular-datatables';
import { TaxComponent } from './tax/tax.component';
import { TaxService } from './_services/tax.service';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ProductViewResolver } from './_resolvers/product-view.resolver';
import { PaymentComponent } from './payment/payment.component';
import { CompanyComponent } from './Company/Company.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TimeagoModule } from 'ngx-timeago';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CommonModule, DecimalPipe } from '@angular/common';
import { OrderResolver } from './_resolvers/order.resolver';
import { TextMaskModule } from 'angular2-text-mask';
import { SellComponent } from './orders/sell/sell.component';
import { StockComponent } from './orders/stock/stock.component';
import { SaleReturnComponent } from './orders/sale-return/sale-return.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { AuthGuard } from './_guards/auth.guard';
import { StockReturnComponent } from './orders/stock-return/stock-return.component';
import { SaleReturnListComponent } from './orders/sale-return-list/sale-return-list.component';
import { StockListComponent } from './orders/stock-list/stock-list.component';
import { StockTransferComponent } from './orders/stock-transfer/stock-transfer.component';
import { OrderInvoiceComponent } from './orders/order-invoice/order-invoice.component';
import { NumberFormatPipe } from './shared/pipes/number.pipe';

import { HeaderComponent } from './components/header/header.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { SidenavService } from './_services/sidenav.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { UserComponent } from './user/user.component';
import { LayoutsModule } from './layouts/layouts.module';
import { WidgetModule } from './shared/widget/widget.module';
import { PagetitleComponent } from './shared/pagetitle/pagetitle.component';
import {
  NgbPaginationModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PurchaseSortableDirective } from './purchase/purchase-sortable.directive';
import { ProductSortableDirective } from './_directives/product-sortable.directive';
import { UploadBulkComponent } from './product/upload-bulk/upload-bulk.component';
import { SchemeAddComponent } from './product/scheme-add/scheme-add.component';
import { SchemeListComponent } from './product/scheme-list/scheme-list.component';
import { NgSelect2Module } from 'ng-select2';
import { PurchaseReturnComponent } from './orders/purchase-return/purchase-return.component';
import { PurchaseReturnListComponent } from './orders/purchase-return-list/purchase-return-list.component';
import { BankService } from './_services/bank.service';
import { LedgerComponent } from './party/ledger/ledger.component';
import { PartyResolver } from './_resolvers/party.resolver';
import { SaleReturnOrderService } from './orders/sale-return-list/saleereturn-orders.service';
import { InvoiceDueListComponent } from './reporting/invoice-due-list/invoice-due-list.component';
import { ReportingService } from './_services/reporting.service';
import { SaleService } from './_services/sale.service';
import { SaleDueListService } from './reporting/invoice-due-list/sale-due.service';
import { SalesDetailsComponent } from './reporting/sales-details/sales-details.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { StockOrderService } from './orders/stock-list/stock-orders.service';
import { StockReturnOrderService } from './orders/stock-return-list/stock-return-orders.service';
import { StockReturnListComponent } from './orders/stock-return-list/stock-return-list.component';
import { ItemWisePurchaseComponent } from './reporting/purchase/item-wise-purchase/item-wise-purchase.component';
import { ItemWiseSalesComponent } from './reporting/sales/item-wise-sales/item-wise-sales.component';
import { PaymentService } from './_services/payment.service';
import { PaymentStatusComponent } from './payment/payment-status/payment-status.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserListComponent } from './user/user-list/user-list.component';
import { StockLedgerComponent } from './reporting/stock-ledger/stock-ledger.component';
import { StockTransferListComponent } from './orders/stock-transfer-list/stock-transfer-list.component';
import { StockTransferOrderService } from './orders/stock-transfer-list/stock-transfer-orders.service';
import { StockWarehouseComponent } from './reporting/stock-warehouse/stock-warehouse.component';
import { ChartsModule } from 'ng2-charts';
import { SalesPieChartComponent } from './dashboard/sales-pie-chart/sales-pie-chart.component';
import { InvoiceService } from './_services/invoice.service';
import { SeletonLoaderModule } from './seleton-loader/seleton-loader.module';
import { SalesPartyComponent } from './reporting/sales-details/sales-party/sales-party.component';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { PosComponent } from './pos/pos.component';
import { QuickLinksComponent } from './dashboard/quick-links/quick-links.component';
import { BranchProductsComponent } from './reporting/branch-products/branch-products.component';
import { PurchaseTaxDetailsComponent } from './purchase/purchase-tax-details/purchase-tax-details.component';
import { sharedModule } from './_shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BranchComponent,
    BankComponent,
    PartyComponent,
    PartyTypeComponent,
    AddPartyComponent,
    AddMemberComponent,
    ListMembersComponent,
    BrandComponent,
    ProductComponent,
    AddProductComponent,
    CategoryComponent,
    PurchaseComponent,
    SellComponent,
    ListComponent,
    SelllistComponent,
    TaxComponent,
    ViewProductComponent,
    PaymentComponent,
    CompanyComponent,
    InvoiceComponent,
    StockComponent,
    SaleReturnComponent,
    HasRoleDirective,
    StockReturnComponent,
    SaleReturnListComponent,
    StockListComponent,
    StockTransferComponent,
    OrderInvoiceComponent,
    HeaderComponent,
    LeftMenuComponent,
    UserComponent,
    PagetitleComponent,
    PurchaseSortableDirective,
    ProductSortableDirective,
    UploadBulkComponent,
    SchemeAddComponent,
    SchemeListComponent,
    PurchaseReturnComponent,
    PurchaseReturnListComponent,
    LedgerComponent,
    InvoiceDueListComponent,
    SalesDetailsComponent,
    StockReturnListComponent,
    StockTransferListComponent,
    ItemWisePurchaseComponent,
    ItemWiseSalesComponent,
    PaymentStatusComponent,
    UserListComponent,
    StockLedgerComponent,
    StockWarehouseComponent,
    SalesPieChartComponent,
    SalesPartyComponent,
    BarChartComponent,
    PosComponent,
    QuickLinksComponent,
    BranchProductsComponent,
    PurchaseTaxDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    UiSwitchModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: [
          'http://ayurveda-api.ambicionestechnology.com/api/',
        ],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AutocompleteLibModule,
    DataTablesModule,
    TimeagoModule.forRoot(),
    TextMaskModule,
    NgSelect2Module,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
    WidgetModule,
    NgApexchartsModule,
    SeletonLoaderModule,
    DatepickerModule,
    sharedModule,
  ],
  providers: [
    AuthGuard,
    BranchService,
    AlertifyService,
    PartyService,
    UserService,
    BrandService,
    ProductService,
    InvoiceService,
    BankService,
    ShopService,
    TaxService,
    ProductViewResolver,
    OrderResolver,
    PartyResolver,
    DecimalPipe,
    NumberFormatPipe,
    SaleReturnOrderService,
    SaleService,
    SaleDueListService,
    PaymentService,
    ReportingService,
    StockOrderService,
    StockTransferOrderService,
    StockReturnOrderService,
    SidenavService,

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
