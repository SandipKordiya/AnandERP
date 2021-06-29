import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseTaxDetailsComponent } from 'src/app/purchase/purchase-tax-details/purchase-tax-details.component';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';

export interface TaxCollection {
  amount: number;
  rate: number;
  cgst: number;
  sgst: number;
  igst: number;
  cess: number;
  tax: number;
  totalAmount: number;
}

@Component({
  selector: 'app-tax-details-dialog',
  templateUrl: './tax-details-dialog.component.html',
  styleUrls: ['./tax-details-dialog.component.scss'],
})
export class TaxDetailsDialogComponent implements OnInit {
  @Input() products;
  public gstTax;
  constructor(public dialog: MatDialog) {
    console.log(this.products);
  }
  openDialog(): void {
    this.gstTax = [];

    const TaxArray = this.products.filter(
      (thing, i, arr) => arr.findIndex((t) => t.taxRate === thing.taxRate) === i
    );
    console.log(TaxArray);
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
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '600px',
      data: { gstTax: <TaxCollection>this.gstTax },
    });
  }
  ngOnInit() {}
}
