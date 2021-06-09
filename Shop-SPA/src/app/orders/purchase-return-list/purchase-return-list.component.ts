import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShopService } from './../../_services/shop.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
// import { PurchaseReturnSortableDirective, PurchaseReturnSortEvent } from './purchase-return-sortable.directive';
import { PurchaseReturnOrder } from './purchasereturn.model';
import { Observable } from 'rxjs';
// import { OrderService } from './purchase-return-orders.service';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { PurchaseReturnOrderService } from './purchasereturn-orders.service';
import { PurchaseReturnSortableDirective, SortEvent } from './purchase-return-sortable.directive';

@Component({
  selector: 'app-purchase-return-list',
  templateUrl: './purchase-return-list.component.html',
  styleUrls: ['./purchase-return-list.component.scss']
})
export class PurchaseReturnListComponent implements OnInit {
// breadcrumb items
baseUrl = environment.apiUrl;

breadCrumbItems: Array<{}>;
orders: PurchaseReturnOrder[];
dtOptions: any = {};

// Table data
ordersData: PurchaseReturnOrder[];

tables$: Observable<PurchaseReturnOrder[]>;
total$: Observable<number>;

@ViewChildren(PurchaseReturnSortableDirective) headers: QueryList<PurchaseReturnSortableDirective>;


constructor(private shopService: ShopService, 
 public service: PurchaseReturnOrderService,
 private alertify: AlertifyService, private spinner: NgxSpinnerService) { 
   this.tables$ = service.tables$;
   this.total$ = service.total$;
 }

ngOnInit() {
 this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'Purchase Returns Orders', active: true }];
 this.getList();
}


getList() {
 this.spinner.show();
 this.shopService.getPurchaseReturnList()
   .subscribe((res: any) => {
     console.log('Purchase return', res);
     this.ordersData = res;
     this.spinner.hide();
   }, error => {
     this.spinner.hide();
     this.alertify.error(error.error);
   });
}

/**
* Sort table data
* @param param0 sort the column
*
*/
 onSort({ column, direction }: SortEvent) {
   // resetting other headers
   this.headers.forEach(header => {
     if (header.sortable !== column) {
       header.direction = '';
     }
   });
   this.service.sortColumn = column;
   this.service.sortDirection = direction;
 }


}
