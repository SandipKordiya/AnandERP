import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../purchase/list/list.component';
import { PurchaseComponent } from '../purchase/purchase.component';
import { SelllistComponent } from '../sell/selllist/selllist.component';
import { OrderResolver } from '../_resolvers/order.resolver';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { PurchaseReturnListComponent } from './purchase-return-list/purchase-return-list.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { SaleReturnListComponent } from './sale-return-list/sale-return-list.component';
import { SaleReturnComponent } from './sale-return/sale-return.component';
import { SellComponent } from './sell/sell.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockReturnListComponent } from './stock-return-list/stock-return-list.component';
import { StockReturnComponent } from './stock-return/stock-return.component';
import { StockTransferListComponent } from './stock-transfer-list/stock-transfer-list.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';

const routes: Routes = [
  {
    path: 'invoice/:type/:id',
    component: OrderInvoiceComponent,
    resolve: { order: OrderResolver },
  },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'purchase/return', component: PurchaseReturnComponent },
  {
    path: 'purchase/return/list',
    component: PurchaseReturnListComponent,
  },
  {
    path: 'pur/edit/:type/:id',
    component: PurchaseComponent,
    resolve: { order: OrderResolver },
  },
  { path: 'purchase/list', component: ListComponent },
  { path: 'sale', component: SellComponent },
  { path: 'sale/edit/:id', component: SellComponent },
  { path: 'sale/return', component: SaleReturnComponent },
  { path: 'sale/return/list', component: SaleReturnListComponent },
  { path: 'sale/list', component: SelllistComponent },
  { path: 'stock', component: StockListComponent },
  { path: 'stock/list', component: StockListComponent },
  { path: 'stock/return', component: StockReturnComponent },
  { path: 'stock/return/list', component: StockReturnListComponent },
  { path: 'stock/transfer', component: StockTransferComponent },
  { path: 'stock/transfer/list', component: StockTransferListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRouteRoutes {}
