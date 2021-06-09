import { BrandService } from './../_services/brand.service';
import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../_services/alertify.service';
import { Brand } from '../_models/brand';
import { Observable } from 'rxjs';
import { OrderSortableDirective, SortEvent } from '../_directives/orders-sortable.directive';
import { BrandFilterService } from './brandFilter.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: any[];
  model: any = {};
  modalRef: BsModalRef;

  breadCrumbItems: Array<{}>;

  // Table data
  ordersData: Brand[];

  tables$: Observable<Brand[]>;
  total$: Observable<number>;

  @ViewChildren(OrderSortableDirective) headers: QueryList<OrderSortableDirective>;


  constructor(private modalService: BsModalService, private brandService: BrandService,
    private alertify: AlertifyService, public service: BrandFilterService,) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard' }, { label: 'Brand', active: true }];

  }

  getList() {
    this.brandService.getBrands()
      .subscribe((res: any) => {
        console.log(res);
        this.brands = res;
      }, error => {
        this.alertify.error(error);
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openm(brand: any, template: TemplateRef<any>){
    console.log('brand', brand)
    this.model = brand;
    this.modalRef = this.modalService.show(template);

  }


  addBoard() {
    console.log(this.model);
    this.brandService.addBrand(this.model).subscribe(next => {
      this.alertify.success('brand added successfully');
      this.modalService.hide();
      this.getList();
    }, error => {
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
