import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderInvoiceComponent } from 'src/app/orders/order-invoice/order-invoice.component';
import { PurchaseReturnListComponent } from 'src/app/orders/purchase-return-list/purchase-return-list.component';
import { PurchaseReturnComponent } from 'src/app/orders/purchase-return/purchase-return.component';
import { SaleReturnListComponent } from 'src/app/orders/sale-return-list/sale-return-list.component';
import { SaleReturnComponent } from 'src/app/orders/sale-return/sale-return.component';
import { SellComponent } from 'src/app/orders/sell/sell.component';
import { StockListComponent } from 'src/app/orders/stock-list/stock-list.component';
import { StockReturnListComponent } from 'src/app/orders/stock-return-list/stock-return-list.component';
import { StockReturnComponent } from 'src/app/orders/stock-return/stock-return.component';
import { StockTransferListComponent } from 'src/app/orders/stock-transfer-list/stock-transfer-list.component';
import { StockTransferComponent } from 'src/app/orders/stock-transfer/stock-transfer.component';
import { StockComponent } from 'src/app/orders/stock/stock.component';
import { ListComponent } from 'src/app/purchase/list/list.component';
import { PurchaseComponent } from 'src/app/purchase/purchase.component';
import { SelllistComponent } from 'src/app/sell/selllist/selllist.component';
import { OrderResolver } from 'src/app/_resolvers/order.resolver';

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
  { path: 'stock', component: StockComponent },
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
