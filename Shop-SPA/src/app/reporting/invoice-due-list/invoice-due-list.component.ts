import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { OrderSortableDirective, SortEvent } from '../../_directives/orders-sortable.directive';
import { AlertifyService } from '../../_services/alertify.service';
import { SaleService } from '../../_services/sale.service';
import { SaleDueList } from './sale-due-list';
import { SaleDueListService } from './sale-due.service';

@Component({
  selector: 'app-invoice-due-list',
  templateUrl: './invoice-due-list.component.html',
  styleUrls: ['./invoice-due-list.component.scss']
})
export class InvoiceDueListComponent implements OnInit {
  branchId: number;
  breadCrumbItems: Array<{}>;
  orders: SaleDueList[];
  dtOptions: any = {};

  // Table data
  ordersData: SaleDueList[];

  tables$: Observable<SaleDueList[]>;
  total$: Observable<number>;
  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;

  constructor(private saleService: SaleService, public service: SaleDueListService, private alertify: AlertifyService, private spinner: NgxSpinnerService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.branchId = parseInt(localStorage.getItem('branchId'));
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'sales dues', active: true }];
  }


  getList() {
    this.spinner.show();
    this.saleService.getSalesDue(this.branchId)
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
