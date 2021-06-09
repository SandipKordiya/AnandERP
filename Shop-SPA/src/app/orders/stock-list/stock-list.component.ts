import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderSortableDirective, SortEvent } from '../../_directives/orders-sortable.directive';
import { AlertifyService } from '../../_services/alertify.service';
import { ShopService } from '../../_services/shop.service';
import { StockModel } from './stock-model';
import { StockOrderService } from './stock-orders.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  orders: any[];
  dtOptions: any = {};
  baseUrl = environment.apiUrl;
  // Table data
  ordersData: StockModel[];
  breadCrumbItems: Array<{}>;

  tables$: Observable<StockModel[]>;
  total$: Observable<number>;
  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;

  constructor(private shopService: ShopService, private alertify: AlertifyService,
    public service: StockOrderService,
    private spinner: NgxSpinnerService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };
    this.getList();
  }


  getList() {
    this.spinner.show();
    const branchId = parseInt(localStorage.getItem('branchId'));
    this.shopService.getStockList(branchId)
      .subscribe((res: any) => {
        console.log(res);
        this.orders = res;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 5,
          lengthMenu: [5, 10, 25],
          processing: true
        };
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
