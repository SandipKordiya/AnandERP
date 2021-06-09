import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderSortableDirective, SortEvent } from '../../_directives/orders-sortable.directive';
import { AlertifyService } from '../../_services/alertify.service';
import { ShopService } from '../../_services/shop.service';
import { StockReturnModel } from './stock-return-model';
import { StockReturnOrderService } from './stock-return-orders.service';

@Component({
  selector: 'app-stock-return-list',
  templateUrl: './stock-return-list.component.html',
  styleUrls: ['./stock-return-list.component.scss']
})
export class StockReturnListComponent implements OnInit {
  orders: any[];
  dtOptions: any = {};
  baseUrl = environment.apiUrl;
  // Table data
  ordersData: StockReturnModel[];
  breadCrumbItems: Array<{}>;

  tables$: Observable<StockReturnModel[]>;
  total$: Observable<number>;
  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;

  constructor(private shopService: ShopService, private alertify: AlertifyService,
    public service: StockReturnOrderService,
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
