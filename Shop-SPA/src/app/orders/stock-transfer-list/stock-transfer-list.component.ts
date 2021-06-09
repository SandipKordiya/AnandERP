import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderSortableDirective, SortEvent } from '../../_directives/orders-sortable.directive';
import { AlertifyService } from '../../_services/alertify.service';
import { ShopService } from '../../_services/shop.service';
import { StockTransferModel } from './stock-transfer-model';
import { StockTransferOrderService } from './stock-transfer-orders.service';

@Component({
  selector: 'app-stock-transfer-list',
  templateUrl: './stock-transfer-list.component.html',
  styleUrls: ['./stock-transfer-list.component.scss']
})
export class StockTransferListComponent implements OnInit {
  orders: any[];
  dtOptions: any = {};
  baseUrl = environment.apiUrl;
  // Table data
  ordersData: StockTransferModel[];
  breadCrumbItems: Array<{}>;

  tables$: Observable<StockTransferModel[]>;
  total$: Observable<number>;
  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;

  constructor(private shopService: ShopService, private alertify: AlertifyService,
    public service: StockTransferOrderService,
    private spinner: NgxSpinnerService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.getList();
  }


  getList() {
    this.spinner.show();
    const branchId = parseInt(localStorage.getItem('branchId'));
    this.shopService.getStockList(branchId)
      .subscribe((res: any) => {
        console.log(res);
        this.orders = res;
       
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
