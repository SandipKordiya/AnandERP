import { ProductService } from './../_services/product.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../_models/product';
import { Observable } from 'rxjs';
import { ProductSortableDirective, SortEvent } from '../_directives/product-sortable.directive';
import { ProductListService } from '../_filterServices/productlist.service';
import { DecimalPipe } from '@angular/common';
import { SchemeAddComponent } from './scheme-add/scheme-add.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductListService, DecimalPipe]
})
export class ProductComponent implements OnInit {
  products: any[];
  model: any = {};
  breadCrumbItems: Array<{}>;
  productsData: Product[];

  // Table data
  ordersData: Product[];

  tables$: Observable<Product[]>;
  total$: Observable<number>;

  @ViewChildren(ProductSortableDirective) headers: QueryList<ProductSortableDirective>;


  constructor(
    public service: ProductListService,
    private productService: ProductService, private alertify: AlertifyService,
    private spinner: NgxSpinnerService, public dialog: MatDialog) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Products' }, { label: 'list', active: true }];

    this.getList();
  }

  openDialog(item: any): void {
    let dialogRef = this.dialog.open(SchemeAddComponent, {
      // height: '600px',
      // width: '800px',
      data: { product: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  getList() {
    this.spinner.show();
    this.productService.getProducts()
      .subscribe((res: any) => {
        console.log('products', res);
        // this.products = res;
        this.ordersData = res;
        this.spinner.hide();
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


  addBoard() {
    console.log(this.model);
    this.productService.addproduct(this.model).subscribe(next => {
      this.alertify.success('product added successfully');
      this.getList();
    }, error => {
      this.alertify.error(error.error);
    });
  }
}
