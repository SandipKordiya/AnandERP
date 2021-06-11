import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseTaxDetailsComponent } from 'src/app/purchase/purchase-tax-details/purchase-tax-details.component';

@Component({
  selector: 'app-added-product-list',
  templateUrl: './added-product-list.component.html',
  styleUrls: ['./added-product-list.component.scss'],
})
export class AddedProductListComponent implements OnInit, OnChanges {
  @Output() EditProduct: EventEmitter<any> = new EventEmitter<string>();
  @Output() DeleteProduct: EventEmitter<any> = new EventEmitter<string>();
  @Output() ProductChange: EventEmitter<any> = new EventEmitter<string>();
  @Input() updateFinal;
  @Input() products;

  ngOnChanges(changes: SimpleChanges) {
    console.log('CalculateFinalValues', changes);
    this.CalculateFinalValues();
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

  // get products(): any {
  //   return this._products;
  // }
  // set products(products: any) {
  //   this._products = products;
  // }

  // private _products;

  public finalGrossAmount: number = 0;
  public finalDiscountAmount: number = 0;
  public finalTotalTaxAmount: number = 0;
  public finalOtherAmount: number = 0;
  public finalRoundOffAmount: number = 0;
  public finalGrandTotalAmount: number = 0;
  public finalCalculatedAmount: number = 0;
  public gstTax: any = 0;

  constructor() {}
  ngOnInit() {
    this.CalculateFinalValues();
  }
  // edit/remove product methods
  editProduct(item) {
    this.EditProduct.emit(item);
  }
  deleteProduct(item) {
    this.DeleteProduct.emit(item);
  }

  CalculateFinalValues(otherAmount: any = 0) {
    this.finalGrossAmount = 0;
    this.finalDiscountAmount = 0;
    this.finalTotalTaxAmount = 0;
    this.finalOtherAmount = 0;
    this.finalRoundOffAmount = 0;
    this.finalGrandTotalAmount = 0;
    this.finalCalculatedAmount = 0;

    this.products.forEach((e) => {
      this.finalGrossAmount += parseFloat(e.rate);
      this.finalTotalTaxAmount += parseFloat(e.taxAmount);
      this.finalDiscountAmount +=
        parseFloat(e.discountAmount) + parseFloat(e.otherDiscountAmount);
      this.finalGrandTotalAmount += parseFloat(e.Amount);
    });
    this.finalGrandTotalAmount += parseFloat(otherAmount);
  }

  onProduchModified() {}

  onOtherChange(e) {
    console.log('otherAmounr', e.value);

    this.CalculateFinalValues(e.value);
  }

  submitPurchase() {}
}
