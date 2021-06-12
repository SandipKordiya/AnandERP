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

  // getColumnTotal() {
  //   const {
  //     GrossAmount,
  //     TotalTaxAmount,
  //     GrandTotalAmount,
  //     discount,
  //     otherDiscount,
  //   } = this.products.reduce(
  //     (acc, item) => {
  //       acc.GrossAmount =
  //         parseFloat(acc.GrossAmount) +
  //         parseFloat(item.rate) * parseFloat(item.quantity);
  //       acc.TotalTaxAmount =
  //         parseFloat(acc.TotalTaxAmount) + parseFloat(item.taxAmount);
  //       acc.GrandTotalAmount =
  //         parseFloat(acc.GrandTotalAmount) + parseFloat(item.Amount);
  //       acc.discount =
  //         parseFloat(acc.discount) +
  //         (parseFloat(acc.GrossAmount) * parseFloat(item.discount)) / 100;
  //       acc.otherDiscount =
  //         parseFloat(acc.otherDiscount) +
  //         ((parseFloat(acc.GrossAmount) - parseFloat(acc.discount)) *
  //           parseFloat(item.OtherDiscount)) /
  //           100;
  //       return acc;
  //     },
  //     {
  //       GrossAmount: 0,
  //       TotalTaxAmount: 0,
  //       GrandTotalAmount: 0,
  //       discount: 0,
  //       otherDiscount: 0,
  //     }
  //   );
  //   this.finalDiscountAmount = discount + otherDiscount;
  //   this.finalGrossAmount = GrossAmount;
  //   this.finalTotalTaxAmount = TotalTaxAmount;
  //   this.finalGrandTotalAmount = parseFloat(
  //     this._decimalPipe.transform(GrandTotalAmount, '1.0-0').replace(/,/g, '')
  //   );
  //   this.finalRoundOffAmount = parseFloat(
  //     (this.finalGrandTotalAmount - parseFloat(GrandTotalAmount)).toFixed(2)
  //   );
  // }

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
      this.finalGrossAmount += parseFloat(e.rate);
      this.finalTotalTaxAmount += parseFloat(e.taxAmount);
      this.finalDiscountAmount +=
        parseFloat(e.discountAmount) + parseFloat(e.otherDiscountAmount);
      this.finalGrandTotalAmount += parseFloat(e.Amount);
      GrandTotalAmount += parseFloat(e.Amount);
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
    if (e && e.value > 0) {
      this.otherAmount = e.value;
    }
  }

  submitPurchase() {}
}
