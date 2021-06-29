import { DecimalPipe } from '@angular/common';
import { DoCheck } from '@angular/core';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-added-product-list',
  templateUrl: './added-product-list.component.html',
  styleUrls: ['./added-product-list.component.scss'],
})
export class AddedProductListComponent implements OnInit, DoCheck {
  @Output() EditProduct: EventEmitter<any> = new EventEmitter<string>();
  @Output() DeleteProduct: EventEmitter<any> = new EventEmitter<string>();
  // @Input() updateFinal;
  @Input() products;
  @Input() MainPostObject;

  public finalGrossAmount: number = 0;
  public finalDiscountAmount: number = 0;
  public finalTotalTaxAmount: number = 0;
  public finalOtherAmount: number = 0;
  public finalRoundOffAmount: number = 0;
  public finalGrandTotalAmount: any = 0;
  public finalCalculatedAmount: number = 0;
  public gstTax: any = 0;
  public otherAmount: any = 0;

  constructor(private _decimalPipe: DecimalPipe) {}
  ngOnInit() {
    this.CalculateFinalValues();
  }
  ngDoCheck() {
    this.CalculateFinalValues();
  }
  // edit/remove product methods
  editProduct(item) {
    this.EditProduct.emit(item);
  }
  deleteProduct(item) {
    this.DeleteProduct.emit(item);
  }

  CalculateFinalValues() {
    this.finalGrossAmount = 0;
    this.finalDiscountAmount = 0;
    this.finalTotalTaxAmount = 0;
    this.finalOtherAmount = 0;
    this.finalRoundOffAmount = 0;
    this.finalGrandTotalAmount = 0;
    this.finalCalculatedAmount = 0;
    let GrandTotalAmount: any = 0;

    this.products.forEach((e) => {
      let discountValue = (e.rate / 100) * e.discount;
      let OtherdiscountValue = (e.rate / 100) * e.otherDiscount;
      this.finalDiscountAmount += discountValue + OtherdiscountValue;

      this.finalGrossAmount += parseFloat(e.rate);
      this.finalTotalTaxAmount += parseFloat(e.taxAmount);

      this.finalGrandTotalAmount += parseFloat(e.amount);
      GrandTotalAmount += parseFloat(e.amount);
    });

    GrandTotalAmount += parseFloat(this.otherAmount);
    this.finalGrandTotalAmount = parseFloat(
      this._decimalPipe.transform(GrandTotalAmount, '1.0-0').replace(/,/g, '')
    );
    this.finalRoundOffAmount = parseFloat(
      (this.finalGrandTotalAmount - parseFloat(GrandTotalAmount)).toFixed(2)
    );
  }

  onOtherChange(e) {
    if (e && e.value >= 0) {
      this.otherAmount = e.value;
    }
  }
}
