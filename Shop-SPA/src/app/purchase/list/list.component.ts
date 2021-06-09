import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShopService } from './../../_services/shop.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchaseSortableDirective, SortEvent } from '../purchase-sortable.directive';
import { Order } from '../purchase.model';
import { Observable } from 'rxjs';
import { OrderService } from '../orders.service';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [OrderService, DecimalPipe]
})
export class ListComponent implements OnInit {
   // breadcrumb items
   baseUrl = environment.apiUrl;

   breadCrumbItems: Array<{}>;
  orders: Order[];
  dtOptions: any = {};

  // Table data
  ordersData: Order[];

  tables$: Observable<Order[]>;
  total$: Observable<number>;

  @ViewChildren(PurchaseSortableDirective) headers: QueryList<PurchaseSortableDirective>;


  constructor(private shopService: ShopService, 
    public service: OrderService,
    private alertify: AlertifyService, private spinner: NgxSpinnerService) { 
      this.tables$ = service.tables$;
      this.total$ = service.total$;
    }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'Purchase Orders', active: true }];
    this.getList();
  }


  getList() {
    this.spinner.show();
    this.shopService.getPurchaseList()
      .subscribe((res: any) => {
        // console.log('Purchase', res);
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
