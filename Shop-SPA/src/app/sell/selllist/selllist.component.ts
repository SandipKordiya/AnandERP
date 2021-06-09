import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShopService } from 'src/app/_services/shop.service';
import { environment } from '../../../environments/environment';
import { SaleOrderService } from './sale-orders.service';
import { SaleSortableDirective, SortEvent } from './sale-sortable.directive';
import { SaleOrder } from './sale.model';

@Component({
  selector: 'app-selllist',
  templateUrl: './selllist.component.html',
  styleUrls: ['./selllist.component.scss']
})
export class SelllistComponent implements OnInit {
  baseUrl = environment.apiUrl;
  breadCrumbItems: Array<{}>;

  orders: any[];
  dtOptions: any = {};
  // Table data
  ordersData: SaleOrder[];

  tables$: Observable<SaleOrder[]>;
  total$: Observable<number>;

  @ViewChildren(SaleSortableDirective) headers: QueryList<SaleSortableDirective>;


  constructor(private shopService: ShopService,
    public service: SaleOrderService,
    private alertify: AlertifyService, private spinner: NgxSpinnerService)
   {    this.tables$ = service.tables$;
    this.total$ = service.total$; }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'Sale Orders', active: true }];

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
    this.shopService.getSellList()
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
