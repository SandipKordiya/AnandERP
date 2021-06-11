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

  constructor(public dialog: MatDialog) {}
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

  CalculateFinalValues() {
    this.finalGrossAmount = 0;
    this.finalDiscountAmount = 0;
    this.finalTotalTaxAmount = 0;
    this.finalOtherAmount = 0;
    this.finalRoundOffAmount = 0;
    this.finalGrandTotalAmount = 0;
    this.finalCalculatedAmount = 0;

    this.products.forEach((e) => {
      this.finalGrossAmount += e.rate;
      this.finalTotalTaxAmount += e.taxAmount;
    });
  }

  onProduchModified() {}

  onOtherChange() {}

  submitPurchase() {}

  openDialog(): void {
    this.gstTax = [];
    const TaxArray = this.products.filter(
      (thing, i, arr) => arr.findIndex((t) => t.taxRate === thing.taxRate) === i
    );

    TaxArray.forEach((element) => {
      let preElement;
      var filterProducts = this.products.filter(
        (item) => item.taxRate === element.taxRate
      );
      const { GrossAmount, TotalTaxAmount, GrandTotalAmount } =
        filterProducts.reduce(
          (acc, item) => {
            acc.GrossAmount =
              parseFloat(acc.GrossAmount) +
              parseFloat(item.rate) * parseFloat(item.quantity);
            acc.TotalTaxAmount =
              parseFloat(acc.TotalTaxAmount) + parseFloat(item.taxAmount);
            acc.GrandTotalAmount =
              parseFloat(acc.GrandTotalAmount) + parseFloat(item.amount);
            return acc;
          },
          {
            GrossAmount: 0,
            TotalTaxAmount: 0,
            GrandTotalAmount: 0,
          }
        );

      // this.model.taxType = "IntraState";

      // this.model.taxType = "InterState";

      this.gstTax.push({
        amount: GrossAmount,
        rate: element.taxRate,
        cgst: TotalTaxAmount / 2,
        sgst: TotalTaxAmount / 2,
        igst: TotalTaxAmount,
        cess: 0,
        tax: TotalTaxAmount,
        totalAmount: GrandTotalAmount,
      });
    });
    console.log('distinct tax', this.gstTax);
    const dialogRef = this.dialog.open(PurchaseTaxDetailsComponent, {
      width: '600px',
      data: { gstTax: this.gstTax },
    });
  }
}
